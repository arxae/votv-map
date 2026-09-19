import L from 'leaflet';
import { watch, type WatchStopHandle } from 'vue';
import { pois } from '../data/data_poi';
import { roadNetworkData } from '../data/data_roads';
import { gameToLeaflet } from '../components/MapView/coords';
import { buildRoadGraph } from '../routing/roadGraph';
import { getRoadNetwork } from '../routing/resolveRoadNetwork';
import { validateRoadNetwork, validateRoadNetworkData } from '../routing/validateRoadNetwork';
import { edgeKindColor, edgeKindLabel } from '../routing/edgeKind';
import { edgeArrowPlacements, edgeDirectionLabel } from '../routing/edgeDirection';
import { useMapState } from './useMapState';

const ROAD_COLOR = '#e8a317';
const NODE_COLOR = '#f5d76e';
const ISSUE_COLOR = '#ff4d4d';

/** Small right-pointing triangle, rotated to `angleDeg` (CSS degrees, 0 = pointing right). */
function arrowIcon(angleDeg: number, color: string): L.DivIcon {
    return L.divIcon({
        className: 'road-debug-arrow-icon',
        html: `<div style="width:16px;height:16px;display:flex;align-items:center;justify-content:center;transform:rotate(${angleDeg}deg);">
            <div style="width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:10px solid ${color};"></div>
        </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
}

export function useRoadDebugLayers(getMap: () => L.Map | null): { dispose: () => void } {
    const mapState = useMapState();
    let layerGroup: L.LayerGroup | null = null;
    let stopWatch: WatchStopHandle | null = null;

    function sync() {
        const map = getMap();
        if (!map) return;

        if (layerGroup) {
            layerGroup.remove();
            layerGroup = null;
        }

        if (!mapState.showRoadDebug) return;

        const issues = [
            ...validateRoadNetworkData(pois, roadNetworkData),
        ];

        let network;
        try {
            network = getRoadNetwork();
            issues.push(...validateRoadNetwork(network));
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            issues.push({ level: 'error', message });
            console.group('[road debug] validation');
            for (const issue of issues) {
                const fn = issue.level === 'error' ? console.error : console.warn;
                fn(issue.message);
            }
            console.groupEnd();
            return;
        }

        const graph = buildRoadGraph(network);
        const errors = issues.filter((i) => i.level === 'error');
        if (issues.length > 0) {
            console.group('[road debug] validation');
            for (const issue of issues) {
                const fn = issue.level === 'error' ? console.error : console.warn;
                fn(issue.message);
            }
            console.groupEnd();
        }

        const group = L.layerGroup();

        for (const { edge, path } of graph.edges.values()) {
            const latLngs = path.map(([x, y]) => gameToLeaflet(x, y));
            const color = errors.length > 0 ? ISSUE_COLOR : edgeKindColor(edge.kind, ROAD_COLOR);
            const kindSuffix = edge.kind ? ` — ${edgeKindLabel(edge.kind)}` : '';
            const directionSuffix = edge.direction ? ` (${edgeDirectionLabel(edge.direction)})` : '';
            L.polyline(latLngs, {
                color,
                weight: 4,
                opacity: 0.85,
            })
                .bindTooltip(`${edge.id}${kindSuffix}${directionSuffix}`, { permanent: false, sticky: true })
                .addTo(group);

            for (const { point, angle } of edgeArrowPlacements(latLngs, edge.direction)) {
                L.marker(point, { icon: arrowIcon(angle, color), interactive: false }).addTo(group);
            }
        }

        for (const [id, { x, y }] of graph.nodes) {
            const latLng = gameToLeaflet(x, y);
            L.circleMarker(latLng, {
                radius: 5,
                color: NODE_COLOR,
                weight: 2,
                fillColor: '#1a1a1a',
                fillOpacity: 0.9,
            })
                .bindTooltip(`${id} (${x}, ${y})`, { permanent: false, direction: 'top' })
                .addTo(group);
        }

        group.addTo(map);
        layerGroup = group;
    }

    stopWatch = watch(
        () => mapState.showRoadDebug,
        () => sync(),
        { immediate: true }
    );

    return {
        dispose: () => {
            stopWatch?.();
            layerGroup?.remove();
            layerGroup = null;
        },
    };
}
