import type { RoadEdge } from '../data/types';

interface EdgeKindInfo {
    kind: RoadEdge['kind'];
    label: string;
    /** Empty string means "use the caller's own default road color". */
    color: string;
}

/** Single source of truth for edge kinds: cycle order, display label, and map color. */
export const EDGE_KIND_CYCLE: EdgeKindInfo[] = [
    { kind: undefined, label: 'Road', color: '' },
    { kind: 'shortcut', label: 'Shortcut', color: '#38bdf8' },
    { kind: 'risky-shortcut', label: 'Risky Shortcut', color: '#f97316' },
    { kind: 'optional', label: 'Optional', color: '#a78bfa' },
    { kind: 'offroad', label: 'Offroad', color: '#a16207' },
];

export function nextEdgeKind(kind: RoadEdge['kind']): RoadEdge['kind'] {
    const index = EDGE_KIND_CYCLE.findIndex((k) => k.kind === kind);
    return EDGE_KIND_CYCLE[(index + 1) % EDGE_KIND_CYCLE.length].kind;
}

export function edgeKindLabel(kind: RoadEdge['kind']): string {
    return EDGE_KIND_CYCLE.find((k) => k.kind === kind)?.label ?? 'Road';
}

export function edgeKindColor(kind: RoadEdge['kind'], defaultColor: string): string {
    return EDGE_KIND_CYCLE.find((k) => k.kind === kind)?.color || defaultColor;
}
