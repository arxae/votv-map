import L from 'leaflet';
import { watch, type WatchStopHandle } from 'vue';
import { gameToLeaflet } from '../components/MapView/coords';
import { getRoadNetwork } from '../routing/resolveRoadNetwork';
import { buildGpsRoute, type GpsRouteLeg } from '../routing/gpsRoute';
import { usePoiMarkings, POI_MARKING_COLORS, topPoiMarking } from './usePoiMarkings';
import { useGpsRoadKindSettings } from './useGpsRouteSettings';
import { useGpsTagSettings } from './useGpsTagSettings';
import { useGpsProgress, GPS_START_POI } from './useGpsProgress';
import { useMapState } from './useMapState';

const DEFAULT_ROUTE_COLOR = POI_MARKING_COLORS.waypoint;
/** Sideways nudge (screen px) so a road walked twice (there and back) shows as two lines, not one. */
const LEG_OFFSET_PX = 3;
/** Spacing (screen px) between direction arrows along the route. */
const ARROW_SPACING_PX = 70;

/** The leg's color is the highest-priority marking on the stop it's heading TO, or the default (waypoint) color if that stop is unmarked (e.g. the final leg back to Alpha). */
function legColor(destinationPoiName: string): string {
    const kind = topPoiMarking(destinationPoiName);
    return kind ? POI_MARKING_COLORS[kind] : DEFAULT_ROUTE_COLOR;
}

function arrowIcon(angleDeg: number, color: string): L.DivIcon {
    return L.divIcon({
        className: 'gps-route-arrow-icon',
        html: `<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;transform:rotate(${angleDeg}deg);">
            <div style="width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:13px solid ${color};"></div>
        </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
}

function stopNumberIcon(n: number, color: string): L.DivIcon {
    return L.divIcon({
        className: 'gps-route-stop-icon',
        html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};color:#fff;font:bold 11px/18px sans-serif;text-align:center;border:2px solid #1a1a1a;box-sizing:border-box;">${n}</div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    });
}

export function useGpsRouteLayer(getMap: () => L.Map | null): { dispose: () => void } {
    const mapState = useMapState();
    const markings = usePoiMarkings();
    const roadKindSettings = useGpsRoadKindSettings();
    const tagSettings = useGpsTagSettings();
    const progress = useGpsProgress();
    let layerGroup: L.LayerGroup | null = null;
    let stopWatch: WatchStopHandle | null = null;
    let zoomHandler: (() => void) | null = null;

    function ensureZoomHandler(map: L.Map) {
        if (zoomHandler) return;
        zoomHandler = () => render();
        map.on('zoomend', zoomHandler);
    }

    /** Projects a leg's game-coordinate path to latlngs, nudged sideways in screen space by the local travel direction. */
    function offsetLegLatLngs(map: L.Map, points: [number, number][]): L.LatLng[] {
        const layerPoints = points.map(([x, y]) => map.latLngToLayerPoint(gameToLeaflet(x, y)));

        return layerPoints.map((p, i) => {
            const prev = layerPoints[Math.max(0, i - 1)];
            const next = layerPoints[Math.min(layerPoints.length - 1, i + 1)];
            const dx = next.x - prev.x;
            const dy = next.y - prev.y;
            const len = Math.hypot(dx, dy) || 1;
            const offset = L.point((-dy / len) * LEG_OFFSET_PX, (dx / len) * LEG_OFFSET_PX);
            return map.layerPointToLatLng(p.add(offset));
        });
    }

    function addArrowsAlong(map: L.Map, latLngs: L.LatLng[], color: string, group: L.LayerGroup) {
        const layerPoints = latLngs.map((ll) => map.latLngToLayerPoint(ll));
        let sinceLastArrow = ARROW_SPACING_PX; // guarantees an arrow near the start of every leg
        for (let i = 0; i < layerPoints.length - 1; i++) {
            const a = layerPoints[i];
            const b = layerPoints[i + 1];
            sinceLastArrow += a.distanceTo(b);
            if (sinceLastArrow < ARROW_SPACING_PX) continue;
            sinceLastArrow = 0;

            const angle = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
            const mid = L.point((a.x + b.x) / 2, (a.y + b.y) / 2);
            L.marker(map.layerPointToLatLng(mid), { icon: arrowIcon(angle, color), interactive: false }).addTo(group);
        }
    }

    function render() {
        const map = getMap();

        if (layerGroup) {
            layerGroup.remove();
            layerGroup = null;
        }

        if (!map) return;
        ensureZoomHandler(map);

        if (!mapState.showGpsRoute) return;

        const waypointIds = Object.keys(markings);
        if (waypointIds.length === 0) return;

        let network;
        try {
            network = getRoadNetwork();
        } catch (err) {
            console.error('[gps route] could not resolve road network', err);
            return;
        }

        const route = buildGpsRoute(
            network,
            progress.currentStart,
            GPS_START_POI,
            waypointIds,
            roadKindSettings,
            tagSettings
        );
        if (!route) {
            console.warn('[gps route] no route could be found between the marked stops');
            return;
        }
        if (route.unreachable.length > 0) {
            console.warn('[gps route] skipped unreachable markers:', route.unreachable);
        }

        const group = L.layerGroup();

        route.legs.forEach((leg: GpsRouteLeg, index: number) => {
            if (leg.points.length < 2) return;
            const color = legColor(leg.to);
            const latLngs = offsetLegLatLngs(map, leg.points);

            L.polyline(latLngs, {
                color,
                weight: 4,
                opacity: 0.9,
                lineCap: 'round',
            }).addTo(group);

            addArrowsAlong(map, latLngs, color, group);

            // Number the destination of every leg except the final one back to
            // the start, so stops read 1..N in the order the route visits them.
            if (index < route.legs.length - 1) {
                const [x, y] = leg.points[leg.points.length - 1];
                L.marker(gameToLeaflet(x, y), {
                    icon: stopNumberIcon(index + 1, color),
                    interactive: false,
                    zIndexOffset: 1000,
                }).addTo(group);
            }
        });

        group.addTo(map);
        layerGroup = group;
    }

    stopWatch = watch(
        () => [mapState.showGpsRoute, markings, roadKindSettings, tagSettings, progress.currentStart],
        () => render(),
        { deep: true, immediate: true }
    );

    return {
        dispose: () => {
            stopWatch?.();
            const map = getMap();
            if (map && zoomHandler) map.off('zoomend', zoomHandler);
            zoomHandler = null;
            layerGroup?.remove();
            layerGroup = null;
        },
    };
}
