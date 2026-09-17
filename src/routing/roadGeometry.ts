import type { RoadEdge, RoadNetwork } from '../data/types';

export function gameCoordDistance(
    a: [number, number],
    b: [number, number]
): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.hypot(dx, dy);
}

export function polylineLength(points: [number, number][]): number {
    let length = 0;
    for (let i = 1; i < points.length; i++) {
        length += gameCoordDistance(points[i - 1], points[i]);
    }
    return length;
}

export function resolveEdgePath(
    network: RoadNetwork,
    edge: RoadEdge
): [number, number][] {
    const from = network.nodes.find((n) => n.id === edge.from);
    const to = network.nodes.find((n) => n.id === edge.to);
    if (!from || !to) {
        return [];
    }

    if (!edge.path || edge.path.length === 0) {
        return [[from.x, from.y], [to.x, to.y]];
    }

    return [
        [from.x, from.y],
        ...edge.path,
        [to.x, to.y],
    ];
}

export function edgeLength(network: RoadNetwork, edge: RoadEdge): number {
    return polylineLength(resolveEdgePath(network, edge));
}
