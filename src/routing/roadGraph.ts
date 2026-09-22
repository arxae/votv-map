import type { RoadEdge, RoadNetwork } from '../data/types';
import { edgeLength, resolveEdgePath } from './roadGeometry';

export interface RoadGraphEdge {
    edge: RoadEdge;
    path: [number, number][];
    length: number;
}

export interface RoadGraph {
    nodes: Map<string, { x: number; y: number }>;
    edges: Map<string, RoadGraphEdge>;
    /** Adjacency: node id -> neighbors reachable by traveling that edge (respects RoadEdge.direction). */
    neighbors: Map<string, { nodeId: string; edgeId: string; length: number }[]>;
}

export function buildRoadGraph(network: RoadNetwork): RoadGraph {
    const nodes = new Map<string, { x: number; y: number }>();
    for (const node of network.nodes) {
        nodes.set(node.id, { x: node.x, y: node.y });
    }

    const edges = new Map<string, RoadGraphEdge>();
    const neighbors = new Map<string, { nodeId: string; edgeId: string; length: number }[]>();

    const addNeighbor = (
        from: string,
        to: string,
        edgeId: string,
        length: number
    ) => {
        const list = neighbors.get(from) ?? [];
        list.push({ nodeId: to, edgeId, length });
        neighbors.set(from, list);
    };

    for (const edge of network.edges) {
        const path = resolveEdgePath(network, edge);
        const length = edgeLength(network, edge);
        edges.set(edge.id, { edge, path, length });
        // 'forward' = from -> to only, 'backward' = to -> from only, otherwise both.
        if (edge.direction !== 'backward') addNeighbor(edge.from, edge.to, edge.id, length);
        if (edge.direction !== 'forward') addNeighbor(edge.to, edge.from, edge.id, length);
    }

    return { nodes, edges, neighbors };
}
