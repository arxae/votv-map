import type { PoiCategory } from "../data/types.ts";
import { pois } from "../data/data_poi.ts";
import { genLineId, lines } from "../data/data_lines.ts";

const DEFAULT_VISIBLE_POI_CATEGORIES = new Set<PoiCategory>([
    "Satellite Dishes",
    "Transformers",
    "CR",
]);

export function buildDefaultVisibleLines(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    for (let i = 0; i < lines.length; i++) {
        result[genLineId(lines[i], i)] = true;
    }

    return result;
}

export function buildDefaultVisbileCategories(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    for (const poi of pois) {
        if (poi.Category !== undefined) {
            result[poi.Category] = DEFAULT_VISIBLE_POI_CATEGORIES.has(poi.Category);
        }
    }

    return result;
}