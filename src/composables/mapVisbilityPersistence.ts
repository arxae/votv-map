import { buildDefaultVisbileCategories, buildDefaultVisibleLines } from './mapVisibilityDefaults.ts'
import type { PersistenceData } from "../data/types.ts";

export const PERSISTENCE_STORAGE_KEY = "votv-visibility";
export const PERSISTENCE_STORAGE_VERSION = 1;

export function mergeVisibility(
    defaults: Record<string, boolean>,
    saved: Record<string, boolean>
): Record<string, boolean> {
    const merged = {...defaults};

    if(!saved) return merged;

    for (const key of Object.keys(defaults)) {
        const value = saved[key];
        if(typeof value === 'boolean') {
            merged[key] = value;
        }
    }

    return merged;
}

export function loadPersistedVisibility(): PersistenceData | null {
    try {
        const raw = localStorage.getItem(PERSISTENCE_STORAGE_KEY);
        if (raw === null) return null;

        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== "object" || parsed === null) return null;

        const data = parsed as Partial<PersistenceData>;
        if (
            data.version !== PERSISTENCE_STORAGE_VERSION ||
            typeof data.visibleCategories !== "object" ||
            typeof data.visibleLines !== "object"
        ) {
            return null;
        }

        return {
            version: PERSISTENCE_STORAGE_VERSION,
            visibleLines: mergeVisibility(buildDefaultVisibleLines(), data.visibleLines),
            visibleCategories: mergeVisibility(buildDefaultVisbileCategories(), data.visibleCategories),
        };
    } catch {
        return null;
    }
}

export function savePersistedVisibility(
    // visibleLines: Record<string, boolean>,
    // visibleCategories: Record<string, boolean>
    data: Pick<PersistenceData, 'visibleLines' | 'visibleCategories'>
): void {
    const payload: PersistenceData = {
        version: PERSISTENCE_STORAGE_VERSION,
        visibleLines: { ...data.visibleLines },
        visibleCategories: { ...data.visibleCategories }
    };
    try {
        localStorage.setItem(PERSISTENCE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
        console.error("Something went wrong");
    }
}