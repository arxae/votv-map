import L from 'leaflet';
import { watch, type WatchStopHandle } from 'vue';
import { pois } from '../data/data_poi';
import { gameToLeaflet } from '../components/MapView/coords';
import { POI_MARKING_COLORS, POI_MARKING_ORDER, usePoiMarkings } from './usePoiMarkings';

const RING_GAP = 6;
const RING_PADDING = 4;
const RING_WEIGHT = 4;

export function usePoiMarkingLayers(getMap: () => L.Map | null): { dispose: () => void } {
    const markings = usePoiMarkings();
    let layerGroup: L.LayerGroup | null = null;
    let stopWatch: WatchStopHandle | null = null;

    function render() {
        const map = getMap();

        if (layerGroup) {
            layerGroup.remove();
            layerGroup = null;
        }

        if (!map) return;

        const group = L.layerGroup();

        for (const poi of pois) {
            const activeKinds = POI_MARKING_ORDER.filter((kind) => markings[poi.Name]?.includes(kind));
            if (activeKinds.length === 0) continue;

            const latLng = gameToLeaflet(poi.X, poi.Y);
            const baseRadius = poi.IconSize / 2 + RING_PADDING;

            activeKinds.forEach((kind, index) => {
                L.circleMarker(latLng, {
                    radius: baseRadius + index * RING_GAP,
                    color: POI_MARKING_COLORS[kind],
                    weight: RING_WEIGHT,
                    opacity: 1,
                    fill: false,
                    interactive: false,
                }).addTo(group);
            });
        }

        group.addTo(map);
        layerGroup = group;
    }

    stopWatch = watch(markings, () => render(), { deep: true, immediate: true });

    return {
        dispose: () => {
            stopWatch?.();
            layerGroup?.remove();
            layerGroup = null;
        },
    };
}
