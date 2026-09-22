// Pure GPS routing logic: no Vue, no Leaflet. Given a road network and a set
// of stops, finds the shortest route (start -> visit every stop once -> end)
// restricted to whichever edge kinds are currently enabled. Start and end are
// usually both Alpha, but they can differ once progress has been made — see
// useGpsProgress.ts.

import type { RoadEdge, RoadNetwork } from '../data/types';
import { buildRoadGraph, type RoadGraph } from './roadGraph';

/** Which non-default edge kinds pathfinding is currently allowed to use. Regular roads are always usable. */
export interface GpsRoadKindSettings {
    shortcut: boolean;
    'risky-shortcut': boolean;
    offroad: boolean;
}

export function isEdgeKindEnabled(kind: RoadEdge['kind'], enabled: GpsRoadKindSettings): boolean {
    if (!kind || kind === 'road') return true;
    if (kind === 'shortcut') return enabled.shortcut;
    if (kind === 'risky-shortcut') return enabled['risky-shortcut'];
    return enabled.offroad;
}

/** Per-tag on/off state, e.g. { 'North Cave': false }. A missing entry means disabled. */
export type GpsTagSettings = Record<string, boolean>;

/**
 * A tagged edge is gated by its tag alone (its own specific unlock, e.g.
 * 'North Cave') — the generic kind toggle doesn't apply to it. An untagged
 * edge falls back to the normal kind gating.
 */
export function isEdgeEnabled(edge: RoadEdge, kindSettings: GpsRoadKindSettings, tagSettings: GpsTagSettings): boolean {
    if (edge.tag) return tagSettings[edge.tag] === true;
    return isEdgeKindEnabled(edge.kind, kindSettings);
}

interface DijkstraResult {
    distances: Map<string, number>;
    prevNode: Map<string, string>;
    prevEdge: Map<string, string>;
}

function dijkstra(graph: RoadGraph, sourceId: string): DijkstraResult {
    const distances = new Map<string, number>();
    const prevNode = new Map<string, string>();
    const prevEdge = new Map<string, string>();
    const visited = new Set<string>();

    for (const id of graph.nodes.keys()) distances.set(id, Infinity);
    distances.set(sourceId, 0);

    for (;;) {
        let currentId: string | null = null;
        let currentDist = Infinity;
        for (const [id, d] of distances) {
            if (!visited.has(id) && d < currentDist) {
                currentDist = d;
                currentId = id;
            }
        }
        if (currentId === null) break;
        visited.add(currentId);

        for (const { nodeId, edgeId, length } of graph.neighbors.get(currentId) ?? []) {
            if (visited.has(nodeId)) continue;
            const alt = currentDist + length;
            if (alt < (distances.get(nodeId) ?? Infinity)) {
                distances.set(nodeId, alt);
                prevNode.set(nodeId, currentId);
                prevEdge.set(nodeId, edgeId);
            }
        }
    }

    return { distances, prevNode, prevEdge };
}

function reconstructEdgeIds(result: DijkstraResult, targetId: string): string[] {
    const edgeIds: string[] = [];
    let cur = targetId;
    while (result.prevEdge.has(cur)) {
        edgeIds.push(result.prevEdge.get(cur)!);
        cur = result.prevNode.get(cur)!;
    }
    edgeIds.reverse();
    return edgeIds;
}

/**
 * Held-Karp exact solver for the open tour: start at `startId`, visit every
 * id in `waypointIds` exactly once in whichever order is shortest, end at
 * `endId` (a plain closed tour is just the special case `startId === endId`).
 * `dist` returns null for an unreachable pair. Returns null if no complete
 * route is possible.
 */
export function solveOpenTour(
    startId: string,
    endId: string,
    waypointIds: string[],
    dist: (a: string, b: string) => number | null
): { order: string[]; distance: number } | null {
    const others = waypointIds;
    const n = others.length;

    if (n === 0) {
        const d = startId === endId ? 0 : dist(startId, endId);
        if (d === null) return null;
        return { order: startId === endId ? [startId] : [startId, endId], distance: d };
    }

    const nodes = [startId, ...others];
    const D: (number | null)[][] = nodes.map((a) => nodes.map((b) => (a === b ? 0 : dist(a, b))));
    const toEnd: (number | null)[] = nodes.map((a) => (a === endId ? 0 : dist(a, endId)));
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (i !== j && D[i][j] === null) return null;
        }
        if (toEnd[i] === null) return null;
    }

    const size = 1 << n;
    const INF = Infinity;
    const dp: number[][] = Array.from({ length: size }, () => new Array(n).fill(INF));
    const parent: number[][] = Array.from({ length: size }, () => new Array(n).fill(-1));

    for (let i = 0; i < n; i++) {
        dp[1 << i][i] = D[0][i + 1] as number;
    }

    for (let mask = 1; mask < size; mask++) {
        for (let i = 0; i < n; i++) {
            if (!(mask & (1 << i))) continue;
            const cur = dp[mask][i];
            if (cur === INF) continue;
            for (let j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                const next = mask | (1 << j);
                const candidate = cur + (D[i + 1][j + 1] as number);
                if (candidate < dp[next][j]) {
                    dp[next][j] = candidate;
                    parent[next][j] = i;
                }
            }
        }
    }

    const fullMask = size - 1;
    let best = INF;
    let bestLast = -1;
    for (let i = 0; i < n; i++) {
        const total = dp[fullMask][i] + (toEnd[i + 1] as number);
        if (total < best) {
            best = total;
            bestLast = i;
        }
    }
    if (bestLast === -1 || !Number.isFinite(best)) return null;

    const orderIdx: number[] = [];
    let mask = fullMask;
    let last = bestLast;
    while (last !== -1) {
        orderIdx.push(last);
        const p = parent[mask][last];
        mask ^= 1 << last;
        last = p;
    }
    orderIdx.reverse();

    return { order: [startId, ...orderIdx.map((i) => others[i]), endId], distance: best };
}

export interface GpsRouteLeg {
    from: string;
    to: string;
    /** Resolved game-coordinate polyline for just this leg, from -> to. */
    points: [number, number][];
}

export interface GpsRouteResult {
    /** Stop ids in visiting order, starting and ending with `startId`. */
    order: string[];
    distance: number;
    /** One entry per consecutive stop pair in `order`. */
    legs: GpsRouteLeg[];
    /** Marked stops that had to be dropped because no enabled road reaches them. */
    unreachable: string[];
}

export function buildGpsRoute(
    network: RoadNetwork,
    startId: string,
    endId: string,
    waypointIds: string[],
    enabledKinds: GpsRoadKindSettings,
    enabledTags: GpsTagSettings
): GpsRouteResult | null {
    const filteredNetwork: RoadNetwork = {
        nodes: network.nodes,
        edges: network.edges.filter((e) => isEdgeEnabled(e, enabledKinds, enabledTags)),
    };
    const graph = buildRoadGraph(filteredNetwork);
    if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) return null;

    const requestedStops = Array.from(new Set(waypointIds.filter((id) => id !== startId && id !== endId)));
    const knownStops = requestedStops.filter((id) => graph.nodes.has(id));

    const fromStart = dijkstra(graph, startId);
    const reachableFromStart = knownStops.filter((id) => Number.isFinite(fromStart.distances.get(id) ?? Infinity));

    const dijkstraByStop = new Map<string, DijkstraResult>();
    dijkstraByStop.set(startId, fromStart);

    // A stop also has to be able to reach the end, or it can't sit anywhere in the route.
    const reachableStops: string[] = [];
    for (const id of reachableFromStart) {
        const result = dijkstra(graph, id);
        if (Number.isFinite(result.distances.get(endId) ?? Infinity)) {
            dijkstraByStop.set(id, result);
            reachableStops.push(id);
        }
    }
    const unreachable = requestedStops.filter((id) => !reachableStops.includes(id));

    const distBetween = (a: string, b: string): number | null => {
        const d = dijkstraByStop.get(a)?.distances.get(b);
        return d !== undefined && Number.isFinite(d) ? d : null;
    };

    const tour = solveOpenTour(startId, endId, reachableStops, distBetween);
    if (!tour) return null;

    const legs: GpsRouteLeg[] = [];
    for (let i = 0; i < tour.order.length - 1; i++) {
        const from = tour.order[i];
        const to = tour.order[i + 1];
        const result = dijkstraByStop.get(from)!;
        const edgeIds = reconstructEdgeIds(result, to);

        const points: [number, number][] = [];
        let cursor = from;
        for (const edgeId of edgeIds) {
            const graphEdge = graph.edges.get(edgeId)!;
            const forward = graphEdge.edge.from === cursor;
            const edgePoints = forward ? graphEdge.path : [...graphEdge.path].reverse();
            points.push(...edgePoints.slice(points.length > 0 ? 1 : 0));
            cursor = forward ? graphEdge.edge.to : graphEdge.edge.from;
        }
        legs.push({ from, to, points });
    }

    return { order: tour.order, distance: tour.distance, legs, unreachable };
}
