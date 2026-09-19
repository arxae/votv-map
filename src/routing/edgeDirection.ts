import type { RoadEdge } from '../data/types';

interface EdgeDirectionInfo {
    direction: RoadEdge['direction'];
    label: string;
}

/** Single source of truth for edge directions: cycle order and display label. */
export const EDGE_DIRECTION_CYCLE: EdgeDirectionInfo[] = [
    { direction: undefined, label: 'Bidirectional' },
    { direction: 'forward', label: 'One-way (from → to)' },
    { direction: 'backward', label: 'One-way (to → from)' },
];

export function nextEdgeDirection(direction: RoadEdge['direction']): RoadEdge['direction'] {
    const index = EDGE_DIRECTION_CYCLE.findIndex((d) => d.direction === direction);
    return EDGE_DIRECTION_CYCLE[(index + 1) % EDGE_DIRECTION_CYCLE.length].direction;
}

export function edgeDirectionLabel(direction: RoadEdge['direction']): string {
    return EDGE_DIRECTION_CYCLE.find((d) => d.direction === direction)?.label ?? 'Bidirectional';
}

export interface EdgeArrowPlacement {
    point: [number, number];
    /** CSS rotation degrees, 0 = pointing along +lng/right, clockwise. */
    angle: number;
}

/**
 * One arrow per segment of a resolved edge path — an array of [lat, lng]
 * points ordered from -> to, as Leaflet polylines use — each rotated to that
 * segment's local direction (reversed for 'backward'). Returns an empty
 * array for bidirectional edges or a path too short to have a direction.
 */
export function edgeArrowPlacements(
    latLngPath: [number, number][],
    direction: RoadEdge['direction']
): EdgeArrowPlacement[] {
    if (direction !== 'forward' && direction !== 'backward') return [];
    if (latLngPath.length < 2) return [];

    const placements: EdgeArrowPlacement[] = [];
    for (let i = 0; i < latLngPath.length - 1; i++) {
        const [lat1, lng1] = latLngPath[i];
        const [lat2, lng2] = latLngPath[i + 1];
        // Screen Y grows downward while lat grows "up", so flip the lat delta.
        let angle = Math.atan2(-(lat2 - lat1), lng2 - lng1) * (180 / Math.PI);
        if (direction === 'backward') angle += 180;
        placements.push({ point: [(lat1 + lat2) / 2, (lng1 + lng2) / 2], angle });
    }
    return placements;
}
