// GPS marking state: any POI can be flagged as hash/repair/upgrade/waypoint.
// Persisted to this browser only (see PoiMarkings.css/SidePanel for the UI,
// usePoiMarkingLayers.ts for the concentric-ring rendering).

import { reactive, watch } from 'vue';

export type PoiMarkingKind = 'hash' | 'repair' | 'upgrade' | 'waypoint';

/** Ring draw order: first = innermost (closest to the icon), last = outermost. */
export const POI_MARKING_ORDER: PoiMarkingKind[] = ['hash', 'repair', 'upgrade', 'waypoint'];

export const POI_MARKING_COLORS: Record<PoiMarkingKind, string> = {
    hash: '#ef4444',
    repair: '#22c55e',
    upgrade: '#3b82f6',
    waypoint: '#a855f7',
};

export const POI_MARKING_LABELS: Record<PoiMarkingKind, string> = {
    hash: 'Hash',
    repair: 'Repair',
    upgrade: 'Upgrade',
    waypoint: 'Waypoint',
};

const STORAGE_KEY = 'votv-poi-markings';

type MarkingState = Record<string, PoiMarkingKind[]>;

function loadPersisted(): MarkingState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return {};
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return {};
        return parsed as MarkingState;
    } catch {
        return {};
    }
}

const state = reactive<MarkingState>(loadPersisted());

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

/** Keyed by Poi.Name -> the active marking kinds for it (POI_MARKING_ORDER order). */
export function usePoiMarkings() {
    return state;
}

export function getPoiMarkings(poiName: string): PoiMarkingKind[] {
    return state[poiName] ?? [];
}

export function isPoiMarked(poiName: string, kind: PoiMarkingKind): boolean {
    return (state[poiName] ?? []).includes(kind);
}

export function togglePoiMarking(poiName: string, kind: PoiMarkingKind): void {
    const current = state[poiName] ?? [];
    if (current.includes(kind)) {
        const next = current.filter((k) => k !== kind);
        if (next.length === 0) {
            delete state[poiName];
        } else {
            state[poiName] = next;
        }
    } else {
        state[poiName] = [...current, kind];
    }
}
