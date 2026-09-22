// Tracks how far along the GPS route you are. Completing a stop clears its
// markings and becomes the new starting point for the rest of the route —
// the route always still ends at Alpha (see useGpsRouteLayer.ts).

import { reactive, watch } from 'vue';
import { clearPoiMarkings, clearAllPoiMarkings, hasAnyPoiMarkings } from './usePoiMarkings';

export const GPS_START_POI = 'Alpha';

const STORAGE_KEY = 'votv-gps-progress';

function loadPersisted(): string {
    try {
        return localStorage.getItem(STORAGE_KEY) ?? GPS_START_POI;
    } catch {
        return GPS_START_POI;
    }
}

const state = reactive({ currentStart: loadPersisted() });

watch(
    () => state.currentStart,
    (value) => {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch {
            // ignore quota / private mode
        }
    }
);

export function useGpsProgress() {
    return state;
}

/**
 * Marks a stop done: clears its markings and makes it the route's new
 * starting point — unless that was the last marked stop, in which case
 * there's nothing left to route to and the start resets back to Alpha.
 */
export function completeStop(poiName: string): void {
    clearPoiMarkings(poiName);
    state.currentStart = hasAnyPoiMarkings() ? poiName : GPS_START_POI;
}

export function resetGpsProgress(): void {
    state.currentStart = GPS_START_POI;
}

/** Clears every marked stop and resets the route's starting point back to Alpha. */
export function resetGpsRoute(): void {
    clearAllPoiMarkings();
    state.currentStart = GPS_START_POI;
}
