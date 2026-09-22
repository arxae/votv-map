// Global map state

import { reactive, watch } from "vue";
import type { Poi, PanelTab } from "../data/types";
import {
	buildDefaultVisibleLines,
	buildDefaultVisbileCategories
} from "./mapVisibilityDefaults.ts";
import {
	loadPersistedVisibility,
	savePersistedVisibility
} from './mapVisbilityPersistence.ts'

function getInitialVisibility(): {
	visibleLines: Record<string, boolean>;
	visibleCategories: Record<string, boolean>;
} {
	const persisted = loadPersistedVisibility();
	if (persisted) {
		return {
			visibleLines: persisted.visibleLines,
			visibleCategories: persisted.visibleCategories,
		};
	}
	return {
		visibleLines: buildDefaultVisibleLines(),
		visibleCategories: buildDefaultVisbileCategories(),
	};
}

const initialVisibility = getInitialVisibility();

const state = reactive({
	visibleLines: initialVisibility.visibleLines,
	visibleCategories: initialVisibility.visibleCategories,
	selectedPoi: null as Poi | null,
	activeTab: "info" as PanelTab,
	showGpsRoute: true,
});

watch(
	() => ({ l: state.visibleLines, c: state.visibleCategories}),
	() => savePersistedVisibility(state),
	{ deep: true }
);

export function useMapState() {
	return state;
}

export function resetVisibility(): void {
	state.visibleLines = buildDefaultVisibleLines();
	state.visibleCategories = buildDefaultVisbileCategories();
	savePersistedVisibility(state)
}
