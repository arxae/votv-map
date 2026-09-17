<!--Panel on the right side of the screen-->

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import HaikuWindow from '../HaikuWindow/HaikuWindow.vue'
import './SidePanel.css'
import  { genLineId, lines } from '../../data/data_lines';
import { useMapState, resetVisibility } from '../../composables/useMapState';
import type { PanelTab } from '../../data/types';

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
                </div>
                <p v-else class="placeholder">Select a map point to see details here.</p>
            </div>
            <div v-else-if="mapState.activeTab === 'points'" class="panel-pane">
                <p class="pane-heading">Categories</p>
                <ul class="toggle-list haiku-well">
                    <li v-for="category in Object.keys(mapState.visibleCategories)" :key="category">
                        <label>
                            <input type="checkbox" v-model="mapState.visibleCategories[category]" />
                            {{ category }}
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
            <p class="pane-heading">Road network (debug)</p>
            <label class="toggle-list haiku-well settings-toggle">
                <input type="checkbox" v-model="mapState.showRoadDebug" />
                Show road graph overlay
            </label>
          </div>
        </div>
    </HaikuWindow>
</template>
