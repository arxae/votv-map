// Per-tag GPS toggles (e.g. 'North Cave'). Grouped separately from the fixed
// road-kind toggles in useGpsRouteSettings.ts because tags are open-ended —
// whatever distinct RoadEdge.tag values currently exist in data_roads.ts. A
// tag with no stored entry defaults to disabled, same as shortcut/offroad.

import { reactive, watch } from 'vue';
import { roadNetworkData } from '../data/data_roads';
import type { GpsTagSettings } from '../routing/gpsRoute';

const STORAGE_KEY = 'votv-gps-tags';

function loadPersisted(): GpsTagSettings {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return {};
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return {};
        return parsed as GpsTagSettings;
    } catch {
        return {};
    }
}

const state = reactive<GpsTagSettings>(loadPersisted());

watch(
    state,
    () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // ignore quota / private mode
        }
    },
    { deep: true }
);

export function useGpsTagSettings() {
    return state;
}

/** Every distinct RoadEdge.tag currently used by data_roads.ts (or the road editor's working copy), sorted. */
export function listRoadTags(edges: { tag?: string }[] = roadNetworkData.edges): string[] {
    const tags = new Set<string>();
    for (const edge of edges) {
        if (edge.tag) tags.add(edge.tag);
    }
    return Array.from(tags).sort();
}
