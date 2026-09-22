// Leaflet rendering/interaction half of the route editor. State lives in
// useRoadEditor.ts; this file turns it into map layers and wires up clicks,
// drags, and context menus.

import L from 'leaflet';
import { watch, type WatchStopHandle } from 'vue';
import { pois } from '../data/data_poi';
import { gameToLeaflet, GAME_MAP_SIZE } from '../components/MapView/coords';
import { resolveEdgePath } from '../routing/roadGeometry';
import { edgeKindColor, edgeKindLabel } from '../routing/edgeKind';
import { edgeArrowPlacements, edgeDirectionLabel } from '../routing/edgeDirection';
import type { RoadNetwork } from '../data/types';
import {
    useRoadEditor,
    moveJunction,
    deleteJunction,
    deleteEdge,
    renameJunction,
    createJunctionAt,
    handleNodeClick,
    insertPathPoint,
    movePathPoint,
    deletePathPoint,
    cycleEdgeKind,
    cycleEdgeDirection,
    setEdgeTag,
} from './useRoadEditor';

const JUNCTION_ICON = L.divIcon({
    className: 'road-editor-junction-icon',
    html: '<div style="width:14px;height:14px;border-radius:50%;background:#4ade80;border:2px solid #123;box-sizing:border-box;"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
});

const PATH_POINT_ICON = L.divIcon({
    className: 'road-editor-path-point-icon',
    html: '<div style="width:9px;height:9px;background:#f5d76e;border:1px solid #123;box-sizing:border-box;"></div>',
    iconSize: [9, 9],
    iconAnchor: [4, 4],
});

const EDGE_COLOR = '#4ade80';
const CONNECT_FROM_COLOR = '#22d3ee';

/** Small right-pointing triangle, rotated to `angleDeg` (CSS degrees, 0 = pointing right). */
function arrowIcon(angleDeg: number, color: string): L.DivIcon {
    return L.divIcon({
        className: 'road-editor-arrow-icon',
        html: `<div style="width:16px;height:16px;display:flex;align-items:center;justify-content:center;transform:rotate(${angleDeg}deg);">
            <div style="width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:10px solid ${color};"></div>
        </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
}

function leafletToGame(latlng: L.LatLng): [number, number] {
    return [latlng.lng - GAME_MAP_SIZE / 2, GAME_MAP_SIZE / 2 - latlng.lat];
}

function distToSegment(p: [number, number], a: [number, number], b: [number, number]): number {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const lengthSq = dx * dx + dy * dy;
    let t = lengthSq === 0 ? 0 : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));
    const cx = a[0] + t * dx;
    const cy = a[1] + t * dy;
    return Math.hypot(p[0] - cx, p[1] - cy);
}

/** Index of the segment of `fullPath` (endpoints + bends) closest to `point`. */
function nearestSegmentIndex(fullPath: [number, number][], point: [number, number]): number {
    let bestIndex = 0;
    let bestDist = Infinity;
    for (let i = 0; i < fullPath.length - 1; i++) {
        const d = distToSegment(point, fullPath[i], fullPath[i + 1]);
        if (d < bestDist) {
            bestDist = d;
            bestIndex = i;
        }
    }
    return bestIndex;
}

export function useRoadEditorLayer(getMap: () => L.Map | null): { dispose: () => void } {
    const editor = useRoadEditor();
    let layerGroup: L.LayerGroup | null = null;
    let stopWatch: WatchStopHandle | null = null;
    let clickHandler: ((e: L.LeafletMouseEvent) => void) | null = null;

    function ensureMapClickHandler(map: L.Map) {
        if (clickHandler) return;
        clickHandler = (e: L.LeafletMouseEvent) => {
            if (!editor.active || editor.tool !== 'add-junction') return;
            const [x, y] = leafletToGame(e.latlng);

            let input: string | null = '';
            for (;;) {
                input = window.prompt('Name for the new junction (required):', input ?? '');
                if (input === null) return; // cancelled
                if (!input.trim()) {
                    window.alert('A junction name is required.');
                    continue;
                }
                if (createJunctionAt(input, x, y)) return;
                // already-taken id: createJunctionAt alerted, loop back to reprompt
            }
        };
        map.on('click', clickHandler);
    }

    function buildNetwork(): RoadNetwork {
        const nodes: RoadNetwork['nodes'] = editor.junctions.map((j) => ({ id: j.id, x: j.x, y: j.y }));
        for (const poi of pois) {
            nodes.push({ id: poi.Name, x: poi.X, y: poi.Y });
        }
        return { nodes, edges: editor.edges };
    }

    function render() {
        const map = getMap();

        if (layerGroup) {
            layerGroup.remove();
            layerGroup = null;
        }

        if (!map) return;
        ensureMapClickHandler(map);

        if (!editor.active) return;

        const group = L.layerGroup();
        const network = buildNetwork();

        // Dragging a marker moves the real mouse cursor across other edges/markers
        // underneath it, which would otherwise pop their hover tooltips open too.
        // Every bindTooltip call below is paired with an entry here so any drag can
        // unbind (and, on drop, rebind) all of them for its duration.
        const tooltipBindings: (() => void)[] = [];
        function suppressAllTooltips() {
            group.eachLayer((layer) => (layer as L.Layer & { unbindTooltip?: () => void }).unbindTooltip?.());
        }
        function restoreAllTooltips() {
            for (const bind of tooltipBindings) bind();
        }

        for (const edge of editor.edges) {
            const path = resolveEdgePath(network, edge);
            if (path.length === 0) continue;
            const latLngs = path.map(([x, y]) => gameToLeaflet(x, y));
            const color = editor.connectFrom === edge.from || editor.connectFrom === edge.to
                ? CONNECT_FROM_COLOR
                : edgeKindColor(edge.kind, EDGE_COLOR);

            const edgeLine = L.polyline(latLngs, { color, weight: 4, opacity: 0.85, dashArray: '6 4' });
            const bindEdgeTooltip = () => {
                const kindSuffix = edge.kind ? ` — ${edgeKindLabel(edge.kind)}` : '';
                const directionSuffix = edge.direction ? ` (${edgeDirectionLabel(edge.direction)})` : '';
                const tagSuffix = edge.tag ? ` [${edge.tag}]` : '';
                edgeLine.bindTooltip(`${edge.id}${kindSuffix}${directionSuffix}${tagSuffix}`, { permanent: false, sticky: true });
            };
            bindEdgeTooltip();
            tooltipBindings.push(bindEdgeTooltip);

            edgeLine
                .on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    if (editor.tool === 'delete') {
                        deleteEdge(edge.id);
                        return;
                    }
                    if (editor.tool === 'set-type') {
                        cycleEdgeKind(edge.id);
                        return;
                    }
                    if (editor.tool === 'set-direction') {
                        cycleEdgeDirection(edge.id);
                        return;
                    }
                    if (editor.tool === 'set-tag') {
                        const input = window.prompt(
                            `Tag for "${edge.id}" (empty to remove):`,
                            edge.tag ?? ''
                        );
                        if (input === null) return; // cancelled
                        setEdgeTag(edge.id, input);
                        return;
                    }
                    if (editor.tool === 'edit-path') {
                        const [x, y] = leafletToGame(e.latlng);
                        const index = nearestSegmentIndex(path, [x, y]);
                        insertPathPoint(edge.id, index, x, y);
                    }
                })
                .addTo(group);

            for (const { point, angle } of edgeArrowPlacements(latLngs, edge.direction)) {
                L.marker(point, { icon: arrowIcon(angle, color), interactive: false }).addTo(group);
            }

            (edge.path ?? []).forEach((point, index) => {
                const marker = L.marker(gameToLeaflet(point[0], point[1]), {
                    icon: PATH_POINT_ICON,
                    draggable: true,
                });

                const bindPointTooltip = () =>
                    marker.bindTooltip(`${edge.id} point ${index} (${point[0]}, ${point[1]})`, {
                        permanent: false,
                        direction: 'top',
                    });
                bindPointTooltip();
                tooltipBindings.push(bindPointTooltip);

                marker.on('dragstart', suppressAllTooltips);

                marker.on('dragend', () => {
                    const [x, y] = leafletToGame(marker.getLatLng());
                    movePathPoint(edge.id, index, x, y);
                    restoreAllTooltips();
                });

                marker.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    if (editor.tool === 'delete') deletePathPoint(edge.id, index);
                });

                marker.on('contextmenu', (e) => {
                    L.DomEvent.stopPropagation(e);
                    if (window.confirm(`Delete this path point on "${edge.id}"?`)) {
                        deletePathPoint(edge.id, index);
                    }
                });

                marker.addTo(group);
            });
        }

        for (const junction of editor.junctions) {
            const marker = L.marker(gameToLeaflet(junction.x, junction.y), {
                icon: JUNCTION_ICON,
                draggable: true,
            });

            const bindJunctionTooltip = () => {
                const highlight = editor.connectFrom === junction.id ? ' (connecting…)' : '';
                marker.bindTooltip(`${junction.id} (${junction.x}, ${junction.y})${highlight}`, {
                    permanent: false,
                    direction: 'top',
                });
            };
            bindJunctionTooltip();
            tooltipBindings.push(bindJunctionTooltip);

            marker.on('dragstart', suppressAllTooltips);

            marker.on('dragend', () => {
                const [x, y] = leafletToGame(marker.getLatLng());
                moveJunction(junction.id, x, y);
                restoreAllTooltips();
            });

            marker.on('click', (e) => {
                L.DomEvent.stopPropagation(e);
                if (editor.tool === 'delete') {
                    deleteJunction(junction.id);
                    return;
                }
                handleNodeClick(junction.id);
            });

            marker.on('contextmenu', (e) => {
                L.DomEvent.stopPropagation(e);
                const newId = window.prompt(`Rename junction "${junction.id}" to:`, junction.id);
                if (newId === null) return;
                renameJunction(junction.id, newId);
            });

            marker.addTo(group);
        }

        group.addTo(map);
        layerGroup = group;
    }

    stopWatch = watch(
        () => [editor.active, editor.junctions, editor.edges, editor.connectFrom, editor.tool],
        () => render(),
        { immediate: true, deep: true }
    );

    return {
        dispose: () => {
            stopWatch?.();
            layerGroup?.remove();
            layerGroup = null;
            const map = getMap();
            if (map && clickHandler) map.off('click', clickHandler);
            clickHandler = null;
        },
    };
}
