// Which non-default road kinds the GPS is allowed to route over. Regular
// roads are always usable and have no toggle. Persisted to this browser.

import { reactive, watch } from 'vue';
import type { GpsRoadKindSettings } from '../routing/gpsRoute';

const STORAGE_KEY = 'votv-gps-road-kinds';

function defaults(): GpsRoadKindSettings {
    return { shortcut: false, 'risky-shortcut': false, offroad: false };
}

function loadPersisted(): GpsRoadKindSettings {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return defaults();
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return defaults();
        return { ...defaults(), ...(parsed as Partial<GpsRoadKindSettings>) };
    } catch {
        return defaults();
    }
}

const state = reactive<GpsRoadKindSettings>(loadPersisted());

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

export function useGpsRoadKindSettings() {
    return state;
}
