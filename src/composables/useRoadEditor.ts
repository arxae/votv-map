// Route editor state.
// Interactive helper for building up data_roads.ts by hand. Owns a working
// copy of the junctions/edges (does NOT touch the source file) plus a
// generated export you paste back into data_roads.ts yourself. Leaving edit
// mode applies the working copy to the live roadNetworkData for the rest of
// the session (see stopRoadEdit below), but that's an in-memory patch only —
// a page refresh reverts to whatever data_roads.ts says.
//
// Rendering/interaction lives in useRoadEditorLayer.ts; this file is pure
// state so it has no Leaflet dependency.

import { reactive } from 'vue';
import type { RoadJunction, RoadEdge } from '../data/types';
import { roadNetworkData } from '../data/data_roads';
import { pois } from '../data/data_poi';
import { nextEdgeKind } from '../routing/edgeKind';
import { nextEdgeDirection } from '../routing/edgeDirection';

export type RoadEditTool =
    | 'select'
    | 'add-junction'
    | 'connect'
    | 'edit-path'
    | 'set-type'
    | 'set-direction'
    | 'set-tag'
    | 'delete';

interface RoadEditorState {
    active: boolean;
    tool: RoadEditTool;
    junctions: RoadJunction[];
    edges: RoadEdge[];
    connectFrom: string | null;
    exportText: string;
}

const state = reactive<RoadEditorState>({
    active: false,
    tool: 'select',
    junctions: [],
    edges: [],
    connectFrom: null,
    exportText: '',
});

function cloneNetwork(): void {
    state.junctions = roadNetworkData.junctions.map((j) => ({ ...j }));
    state.edges = roadNetworkData.edges.map((e) => ({
        ...e,
        path: e.path ? e.path.map(([x, y]) => [x, y] as [number, number]) : undefined,
    }));
}

export function useRoadEditor() {
    return state;
}

export function startRoadEdit(): void {
    cloneNetwork();
    state.active = true;
    state.tool = 'select';
    state.connectFrom = null;
    state.exportText = '';
}

/**
 * Applies the working copy to the live roadNetworkData for the rest of this
 * session (so the map reflects it immediately). This is an in-memory
 * mutation only — nothing is written to disk, so a page refresh reverts to
 * the data_roads.ts source.
 */
export function stopRoadEdit(): void {
    roadNetworkData.junctions = state.junctions.map((j) => ({ ...j }));
    roadNetworkData.edges = state.edges.map((e) => ({
        ...e,
        path: e.path ? e.path.map(([x, y]) => [x, y] as [number, number]) : undefined,
    }));

    state.active = false;
    state.connectFrom = null;
}

export function setRoadEditTool(tool: RoadEditTool): void {
    state.tool = tool;
    state.connectFrom = null;
}

/** Returns false (and alerts) if the id is empty or already taken, so the caller can reprompt. */
export function createJunctionAt(rawId: string, x: number, y: number): boolean {
    const id = rawId.trim();
    if (!id) return false;
    if (state.junctions.some((j) => j.id === id) || pois.some((p) => p.Name === id)) {
        window.alert(`Id "${id}" is already in use.`);
        return false;
    }
    state.junctions.push({ id, x: Math.round(x), y: Math.round(y) });
    return true;
}

export function moveJunction(id: string, x: number, y: number): void {
    const junction = state.junctions.find((j) => j.id === id);
    if (!junction) return;
    junction.x = Math.round(x);
    junction.y = Math.round(y);
}

export function renameJunction(oldId: string, rawNewId: string): void {
    const newId = rawNewId.trim();
    if (!newId || newId === oldId) return;
    if (state.junctions.some((j) => j.id === newId) || pois.some((p) => p.Name === newId)) {
        window.alert(`Id "${newId}" is already in use.`);
        return;
    }

    const junction = state.junctions.find((j) => j.id === oldId);
    if (!junction) return;
    junction.id = newId;

    for (const edge of state.edges) {
        if (edge.from === oldId) edge.from = newId;
        if (edge.to === oldId) edge.to = newId;
        if (edge.id.includes(oldId)) edge.id = edge.id.split(oldId).join(newId);
    }

    if (state.connectFrom === oldId) state.connectFrom = newId;
}

export function deleteJunction(id: string): void {
    state.junctions = state.junctions.filter((j) => j.id !== id);
    state.edges = state.edges.filter((e) => e.from !== id && e.to !== id);
    if (state.connectFrom === id) state.connectFrom = null;
}

export function deleteEdge(id: string): void {
    state.edges = state.edges.filter((e) => e.id !== id);
}

export function insertPathPoint(edgeId: string, index: number, x: number, y: number): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge) return;
    if (!edge.path) edge.path = [];
    edge.path.splice(index, 0, [Math.round(x), Math.round(y)]);
}

export function movePathPoint(edgeId: string, index: number, x: number, y: number): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge || !edge.path || !edge.path[index]) return;
    edge.path[index] = [Math.round(x), Math.round(y)];
}

export function deletePathPoint(edgeId: string, index: number): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge || !edge.path) return;
    edge.path.splice(index, 1);
    if (edge.path.length === 0) edge.path = undefined;
}

export function cycleEdgeKind(edgeId: string): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge) return;
    edge.kind = nextEdgeKind(edge.kind);
}

export function cycleEdgeDirection(edgeId: string): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge) return;
    edge.direction = nextEdgeDirection(edge.direction);
}

/** Pass null (or an empty/whitespace-only string) to clear the edge's tag. */
export function setEdgeTag(edgeId: string, rawTag: string | null): void {
    const edge = state.edges.find((e) => e.id === edgeId);
    if (!edge) return;
    const tag = rawTag?.trim();
    edge.tag = tag ? tag : undefined;
}

export function connectNodes(a: string, b: string): void {
    if (a === b) return;
    const id = `${a}-to-${b}`;
    if (state.edges.some((e) => e.id === id)) return;
    state.edges.push({ id, from: a, to: b });
}

/** Feed clicks on junction markers and POI markers through here while tool === 'connect'. */
export function handleNodeClick(nodeId: string): void {
    if (state.tool !== 'connect') return;
    if (!state.connectFrom) {
        state.connectFrom = nodeId;
        return;
    }
    connectNodes(state.connectFrom, nodeId);
    state.connectFrom = null;
}

function generateExport(): string {
    const lines: string[] = [];
    lines.push("export const roadNetworkData: RoadNetworkData = {");
    lines.push("    junctions: [");
    for (const j of state.junctions) {
        lines.push(`        { id: '${j.id}', x: ${j.x}, y: ${j.y} },`);
    }
    lines.push("    ],");
    lines.push("    edges: [");
    for (const e of state.edges) {
        const kindPart = e.kind ? `, kind: '${e.kind}'` : '';
        const directionPart = e.direction ? `, direction: '${e.direction}'` : '';
        const tagPart = e.tag ? `, tag: '${e.tag}'` : '';
        if (e.path && e.path.length > 0) {
            const path = e.path.map(([x, y]) => `[${x}, ${y}]`).join(', ');
            lines.push(`        { id: '${e.id}', from: '${e.from}', to: '${e.to}', path: [${path}]${kindPart}${directionPart}${tagPart} },`);
        } else {
            lines.push(`        { id: '${e.id}', from: '${e.from}', to: '${e.to}'${kindPart}${directionPart}${tagPart} },`);
        }
    }
    lines.push("    ]");
    lines.push("};");
    return lines.join('\n');
}

export function exportRoadNetwork(): void {
    state.exportText = generateExport();
}
