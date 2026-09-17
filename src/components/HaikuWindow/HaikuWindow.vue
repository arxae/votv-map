<script setup lang="ts">
import './HaikuWindow.css'

export type HaikuTab = {
    id: string
    label: string
}

defineProps<{
    tabs: HaikuTab[]
    activeTab: string
}>()

const emit = defineEmits<{
    selectTab: [id: string]
}>()
</script>

<template>
    <div class="haiku-window">
        <div class="haiku-window__tabs" role="tablist">
            <button v-for="tab in tabs" :key="tab.id" type="button" role="tab" class="haiku-tab"
                :class="{ 'haiku-tab--active': activeTab === tab.id }" :aria-selected="activeTab === tab.id"
                @click="emit('selectTab', tab.id)">
                {{ tab.label }}
            </button>
        </div>
        <div class="haiku-window__frame">
            <div class="haiku-window__body haiku-well">
                <slot />
            </div>
        </div>
    </div>
</template>
