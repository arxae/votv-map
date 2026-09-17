<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'
import HaikuWindow from '../HaikuWindow/HaikuWindow.vue'

import { gameToLeaflet, GAME_MAP_SIZE } from './coords';
import { useMapState } from '../../composables/useMapState';
import { genLineId, lines } from '../../data/data_lines';
import { pois } from '../../data/data_poi';
import type { Poi } from '../../data/types.ts'
import { useRoadDebugLayers } from '../../composables/useRoadDebugLayers';

const mapContainer = ref<HTMLElement | null>(null)
const mapState = useMapState();
let map: L.Map | null = null
let roadDebug: ReturnType<typeof useRoadDebugLayers> | null = null;

const mapTabs = [{ id: 'map', label: 'Map' }]

const lineLayers = new Map<string, L.Polyline>();
const poiLayers = new Map<Poi, L.Marker>();

// TEMP: persisted map zoom/center — remove this block + usage below to drop feature
const MAP_VIEW_STORAGE_KEY = 'votv-map-view';

function loadPersistedMapView(): { zoom: number; center: L.LatLngExpression } | null {
    try {
        const raw = localStorage.getItem(MAP_VIEW_STORAGE_KEY);
        if (raw === null) return null;
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return null;
        const { zoom, center } = parsed as { zoom?: unknown; center?: unknown };
        if (typeof zoom !== 'number' || !Array.isArray(center) || center.length !== 2) return null;
        const [lat, lng] = center;
        if (typeof lat !== 'number' || typeof lng !== 'number') return null;
        return { zoom, center: [lat, lng] };
    } catch {
        return null;
    }
}

function savePersistedMapView(mapInstance: L.Map): void {
    const center = mapInstance.getCenter();
    try {
        localStorage.setItem(
            MAP_VIEW_STORAGE_KEY,
            JSON.stringify({ zoom: mapInstance.getZoom(), center: [center.lat, center.lng] })
        );
    } catch {
        // ignore quota / private mode
    }
}

onMounted(() => {
    if (!mapContainer.value) return

    let renderer : L.Renderer | undefined;

    if(L.Browser.svg) {
        renderer = L.svg({ padding: 5 });
    } else if (L.Browser.canvas) {
        renderer = L.canvas({ padding: 5 });
    }

    const bounds: L.LatLngBoundsExpression = [[0, 0], [GAME_MAP_SIZE, GAME_MAP_SIZE]]

    const mapInstance = L.map(mapContainer.value, {
        crs: L.CRS.Simple,
        attributionControl: false,
        renderer: renderer
    })

    map = mapInstance;

    L.imageOverlay('/map.webp', bounds).addTo(mapInstance);

    const persistedView = loadPersistedMapView();
    if (persistedView) {
        mapInstance.setView(persistedView.center, persistedView.zoom, { animate: false });
    } else {
        mapInstance.fitBounds(bounds);
    }

    mapInstance.on('zoomend moveend', () => savePersistedMapView(mapInstance));

    lines.forEach((line, index) => {
        const latLngs = line.Coordinates.map(([x, y]) => gameToLeaflet(x, y));

        const id = genLineId(line, index)
        const polyline = L.polyline(latLngs, { 
            color: line.Color, 
            weight: line.LineThickness,
            renderer: renderer
        });
        polyline.addTo(mapInstance);
        lineLayers.set(id, polyline);
    });

    pois.forEach((poi) => {
        const icon = L.icon({
            iconUrl: `/${poi.Icon}`,
            iconSize: [poi.IconSize, poi.IconSize],
            iconAnchor: [poi.IconSize / 2, poi.IconSize / 2],
        });

        const marker = L.marker(gameToLeaflet(poi.X, poi.Y), { icon: icon });

        marker.on('click', () => {
            mapState.selectedPoi = poi;
            mapState.activeTab = 'info';
        });

        poiLayers.set(poi, marker);
    });

    syncLineVisibility(mapState.visibleLines);
    syncPoiVisibility(mapState.visibleCategories);

    watch(
        () => mapState.visibleLines,
        (visible: Record<string, boolean>) => {
            syncLineVisibility(visible)
        },
        { deep: true }
    );

    watch(
        () => mapState.visibleCategories,
        (visible: Record<string, boolean>) => {
            syncPoiVisibility(visible)
        },
        { deep: true }
    );

    roadDebug = useRoadDebugLayers(() => map);
})

onUnmounted(() => {
    roadDebug?.dispose();
    roadDebug = null;
    map?.remove()
    map = null
})

function invalidateSize() {
    map?.invalidateSize()
}

function syncLineVisibility(visibleLines: Record<string, boolean>) {
    if (!map) return;

    for(const [id, polyline] of lineLayers) {
        if(visibleLines[id]) {
            polyline.addTo(map);
        } else {
            polyline.remove();
        }
    }
}

function syncPoiVisibility(visibleCategories: Record<string, boolean>) {
    if (!map) return;

    for (const [poi, marker] of poiLayers) {
        const visible = !poi.Category || visibleCategories[poi.Category];
        if (visible) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    }
}

defineExpose({ invalidateSize })
</script>

<template>
    <HaikuWindow :tabs="mapTabs" active-tab="map" class="map-window">
        <div ref="mapContainer" class="map" />
    </HaikuWindow>
</template>
