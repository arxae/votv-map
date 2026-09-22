<!--Panel on the right side of the screen-->

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import HaikuWindow from '../HaikuWindow/HaikuWindow.vue'
import './SidePanel.css'
import  { genLineId, lines } from '../../data/data_lines';
import { useMapState, resetVisibility } from '../../composables/useMapState';
import type { PanelTab } from '../../data/types';
import {
    useRoadEditor,
    startRoadEdit,
    stopRoadEdit,
    exportRoadNetwork,
} from '../../composables/useRoadEditor';
import { EDGE_KIND_CYCLE } from '../../routing/edgeKind';
import {
    POI_MARKING_ORDER,
    POI_MARKING_COLORS,
    POI_MARKING_LABELS,
    isPoiMarked,
    togglePoiMarking,
    getPoiMarkings,
} from '../../composables/usePoiMarkings';
import { useGpsRoadKindSettings } from '../../composables/useGpsRouteSettings';
import { useGpsTagSettings, listRoadTags } from '../../composables/useGpsTagSettings';
import {
    useGpsProgress,
    completeStop,
    resetGpsProgress,
    resetGpsRoute,
    GPS_START_POI,
} from '../../composables/useGpsProgress';

const emit = defineEmits<{
    layoutChange: []
}>()

const tabs: { id: PanelTab; label: string }[] = [
    { id: 'info', label: 'Info' },
    { id: 'points', label: 'Points' },
    { id: 'visibility', label: 'Visibility' },
    { id: 'settings', label: 'Settings' },
]

const mapState = useMapState();
const roadEditor = useRoadEditor();
const gpsRoadKinds = useGpsRoadKindSettings();
const gpsTags = useGpsTagSettings();
const gpsProgress = useGpsProgress();

// The default "Road" kind has no fixed color (each layer uses its own base
// color), so the legend shows it as the editor's own road color.
const edgeKindLegend = EDGE_KIND_CYCLE.map((entry) => ({
    label: entry.label,
    color: entry.color || '#4ade80',
}));

function toggleRoadEdit() {
    if (roadEditor.active) stopRoadEdit();
    else startRoadEdit();
}

async function copyExportText() {
    try {
        await navigator.clipboard.writeText(roadEditor.exportText);
    } catch {
        // clipboard permissions may be unavailable; the textarea can still be selected manually
    }
}

function notifyLayoutChange() {
    emit('layoutChange')
}

function selectTab(tab: string) {
    mapState.activeTab = tab as PanelTab
}

onMounted(() => {
    window.addEventListener('resize', notifyLayoutChange)
});

onUnmounted(() => {
    window.removeEventListener('resize', notifyLayoutChange)
});
</script>

<template>
    <HaikuWindow :tabs="tabs" :active-tab="mapState.activeTab" class="side-panel-window" @select-tab="selectTab">
        <div class="panel-content">
            <div v-if="mapState.activeTab === 'info'" class="panel-pane">
                <div v-if="mapState.selectedPoi" class="poi-detail">
                    <div class="poi-detail__header">
                        <img :src="`/${mapState.selectedPoi.Icon}`" :alt="mapState.selectedPoi.Name" class="poi-detail__icon" />
                        <h3 class="poi-detail__title">{{ mapState.selectedPoi.Name }}</h3>
                    </div>
                    <dl v-if="mapState.selectedPoi.Category" class="poi-detail__fields">
                        <dt>Category:</dt>
                        <dd>{{ mapState.selectedPoi.Category }}</dd>
                    </dl>
                    <p v-if="mapState.selectedPoi.Description" class="poi-detail__description" v-html="mapState.selectedPoi.Description"></p>

                    <p class="pane-heading">GPS markings</p>
                    <ul class="toggle-list haiku-well">
                        <li v-for="kind in POI_MARKING_ORDER" :key="kind">
                            <label>
                                <input
                                    type="checkbox"
                                    :checked="isPoiMarked(mapState.selectedPoi.Name, kind)"
                                    @change="togglePoiMarking(mapState.selectedPoi.Name, kind)"
                                />
                                <span class="poi-marking-swatch" :style="{ borderColor: POI_MARKING_COLORS[kind] }"></span>
                                {{ POI_MARKING_LABELS[kind] }}
                            </label>
                        </li>
                    </ul>

                    <button
                        v-if="getPoiMarkings(mapState.selectedPoi.Name).length > 0"
                        type="button"
                        class="haiku-button"
                        @click="completeStop(mapState.selectedPoi.Name)"
                    >
                        Complete
                    </button>
                </div>
                <p v-else class="placeholder">Select a map point to see details here.</p>
            </div>
            <div v-else-if="mapState.activeTab === 'points'" class="panel-pane">
                <p class="pane-heading">Categories</p>
                <ul class="toggle-list haiku-well">
                    <li v-for="category in Object.keys(mapState.visibleCategories)" :key="category">
                        <label>
                            <input type="checkbox" v-model="mapState.visibleCategories[category]" />
                            {{ category || 'Uncategorized' }}
                        </label>
                    </li>
                </ul>
            </div>
            <div v-else-if="mapState.activeTab === 'visibility'" class="panel-pane">
                <p class="pane-heading">Lines</p>
                <ul class="toggle-list haiku-well">
                    <li v-for="(line, index) in lines" :key="genLineId(line, index)">
                        <label>
                            <input type="checkbox" v-model="mapState.visibleLines[genLineId(line, index)]" />
                            {{ line.Name ?? `Line ${index + 1}` }}
                        </label>
                    </li>
                </ul>
            </div>
          <div v-else class="panel-pane settings-pane">
            <p class="placeholder">Visibility choices are saved in this browser.</p>
            <button type="button" class="haiku-button" @click="resetVisibility()">
                Reset visibility to defaults
            </button>
            <p class="pane-heading">GPS</p>
            <div class="toggle-list haiku-well settings-toggle">
                <label>
                    <input type="checkbox" v-model="mapState.showGpsRoute" />
                    Show route to marked stops
                </label>
            </div>
            <button type="button" class="haiku-button" @click="resetGpsRoute()">
                Clear all marked stops
            </button>
            <p class="placeholder">
                The route always ends at Alpha (it starts there too, until you complete a stop)
                and visits every marked stop by the shortest path. Each leg is colored by the
                highest-priority action waiting at the stop it leads to. Regular roads are
                always usable; these road types are optional:
            </p>
            <ul class="toggle-list haiku-well">
                <li>
                    <label>
                        <input type="checkbox" v-model="gpsRoadKinds.shortcut" />
                        Shortcut
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="gpsRoadKinds['risky-shortcut']" />
                        Risky Shortcut
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="gpsRoadKinds.offroad" />
                        Offroad
                    </label>
                </li>
            </ul>

            <template v-if="listRoadTags().length > 0">
                <p class="placeholder">
                    Tagged routes need something special before they can be used, and are toggled
                    individually:
                </p>
                <ul class="toggle-list haiku-well">
                    <li v-for="tag in listRoadTags()" :key="tag">
                        <label>
                            <input type="checkbox" v-model="gpsTags[tag]" />
                            {{ tag }}
                        </label>
                    </li>
                </ul>
            </template>

            <p v-if="gpsProgress.currentStart !== GPS_START_POI" class="placeholder">
                Route now starts from "{{ gpsProgress.currentStart }}" (last stop completed).
                <button type="button" class="haiku-button" @click="resetGpsProgress()">
                    Reset to Alpha
                </button>
            </p>

            <p class="pane-heading">Route editor</p>
            <div class="toggle-list haiku-well settings-toggle route-editor-panel">
                <button type="button" class="haiku-button" @click="toggleRoadEdit">
                    {{ roadEditor.active ? 'Stop editing routes' : 'Edit routes' }}
                </button>

                <template v-if="roadEditor.active">
                    <div class="route-editor-tools">
                        <label>
                            <input type="radio" value="select" v-model="roadEditor.tool" />
                            Select / drag / rename
                        </label>
                        <label>
                            <input type="radio" value="add-junction" v-model="roadEditor.tool" />
                            Add junction (click map)
                        </label>
                        <label>
                            <input type="radio" value="connect" v-model="roadEditor.tool" />
                            Connect (click two nodes)
                        </label>
                        <label>
                            <input type="radio" value="edit-path" v-model="roadEditor.tool" />
                            Add path point (click an edge)
                        </label>
                        <label>
                            <input type="radio" value="set-type" v-model="roadEditor.tool" />
                            Set edge type (click an edge to cycle)
                        </label>
                        <label>
                            <input type="radio" value="set-direction" v-model="roadEditor.tool" />
                            Set edge direction (click an edge to cycle)
                        </label>
                        <label>
                            <input type="radio" value="set-tag" v-model="roadEditor.tool" />
                            Set edge tag (click an edge)
                        </label>
                        <label>
                            <input type="radio" value="delete" v-model="roadEditor.tool" />
                            Delete (click junction/edge/point)
                        </label>
                    </div>
                    <p class="placeholder">
                        Drag a junction or path point to move it. Right-click a junction to rename it,
                        or a path point to delete it. Use "delete" mode to remove junctions, edges, or
                        path points, "add path point" mode to click an edge and insert a bend there,
                        "set edge type" mode to click through Road → Shortcut → Risky Shortcut →
                        Offroad, "set edge direction" mode to click through Bidirectional → One-way
                        (from → to) → One-way (to → from) (an arrow shows the travel direction on
                        one-way edges), or "set edge tag" mode to click an edge and type a tag (e.g.
                        "North Cave") — tagged edges get their own toggle in GPS settings, on top of
                        whatever their type already requires.
                    </p>
                    <ul class="route-editor-legend">
                        <li v-for="entry in edgeKindLegend" :key="entry.label">
                            <span class="route-editor-legend__swatch" :style="{ background: entry.color }"></span>
                            {{ entry.label }}
                        </li>
                    </ul>
                    <button type="button" class="haiku-button" @click="exportRoadNetwork()">
                        Export
                    </button>
                    <template v-if="roadEditor.exportText">
                        <textarea
                            class="route-editor-export"
                            readonly
                            :value="roadEditor.exportText"
                            @click="($event.target as HTMLTextAreaElement).select()"
                        ></textarea>
                        <button type="button" class="haiku-button" @click="copyExportText">
                            Copy to clipboard
                        </button>
                    </template>
                </template>
            </div>
          </div>
        </div>
    </HaikuWindow>
</template>
