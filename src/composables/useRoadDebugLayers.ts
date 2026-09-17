import L from 'leaflet';
import { watch, type WatchStopHandle } from 'vue';
import { pois } from '../data/data_poi';
import { roadNetworkData } from '../data/data_roads';
import { gameToLeaflet } from '../components/MapView/coords';
import { buildRoadGraph } from '../routing/roadGraph';
import { getRoadNetwork } from '../routing/resolveRoadNetwork';
import { validateRoadNetwork, validateRoadNetworkData } from '../routing/validateRoadNetwork';
import { useMapState } from './useMapState';

const ROAD_COLOR = '#e8a317';
const NODE_COLOR = '#f5d76e';
const ISSUE_COLOR = '#ff4d4d';

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
        const edgeColor = errors.length > 0 ? ISSUE_COLOR : ROAD_COLOR;

        for (const { path } of graph.edges.values()) {
            const latLngs = path.map(([x, y]) => gameToLeaflet(x, y));
            L.polyline(latLngs, {
                color: edgeColor,
                weight: 4,
                opacity: 0.85,
            }).addTo(group);
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
                .bindTooltip(id, { permanent: false, direction: 'top' })
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
