<script setup lang="ts">
import { nextTick, ref } from 'vue'
import MapView from './components/MapView/MapView.vue'
import SidePanel from './components/SidePanel/SidePanel.vue'
import './styles/app.css'

const mapView = ref<InstanceType<typeof MapView> | null>(null)

async function onPanelLayoutChange() {
    await nextTick()
    mapView.value?.invalidateSize()
}
</script>

<template>
    <div class="app-layout">
        <MapView ref="mapView" />
        <SidePanel @layout-change="onPanelLayoutChange" />
    </div>
</template>
