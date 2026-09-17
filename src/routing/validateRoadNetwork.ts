import type { Poi, RoadNetwork, RoadNetworkData } from '../data/types';
import { gameCoordDistance, resolveEdgePath } from './roadGeometry';

const ENDPOINT_EPSILON = 1;

export interface RoadValidationIssue {
    level: 'error' | 'warning';
    message: string;
}

export function validateRoadNetworkData(
    allPois: Poi[],
    data: RoadNetworkData
): RoadValidationIssue[] {
    const issues: RoadValidationIssue[] = [];
    const poiByName = new Map(allPois.map((p) => [p.Name, p]));
    const junctionIds = new Set<string>();

    for (const junction of data.junctions) {
        if (junctionIds.has(junction.id)) {
            issues.push({ level: 'error', message: `Duplicate junction id: ${junction.id}` });
        }
        junctionIds.add(junction.id);
        if (poiByName.has(junction.id)) {
            issues.push({
                level: 'error',
                message: `Junction id "${junction.id}" matches a POI name`,
            });
        }
    }

    const seenEdgeIds = new Set<string>();
    for (const edge of data.edges) {
        if (seenEdgeIds.has(edge.id)) {
            issues.push({ level: 'error', message: `Duplicate edge id: ${edge.id}` });
        }
        seenEdgeIds.add(edge.id);

        for (const endpoint of [edge.from, edge.to]) {
            if (junctionIds.has(endpoint) || poiByName.has(endpoint)) continue;
            issues.push({
                level: 'error',
                message: `Edge ${edge.id}: unknown endpoint "${endpoint}"`,
            });
        }
    }

    return issues;
}

export function validateRoadNetwork(network: RoadNetwork): RoadValidationIssue[] {
    const issues: RoadValidationIssue[] = [];
    const nodeById = new Map(network.nodes.map((n) => [n.id, n]));
    const seenNodeIds = new Set<string>();

    for (const node of network.nodes) {
        if (seenNodeIds.has(node.id)) {
            issues.push({ level: 'error', message: `Duplicate node id: ${node.id}` });
        }
        seenNodeIds.add(node.id);
    }

    const seenEdgeIds = new Set<string>();
    for (const edge of network.edges) {
        if (seenEdgeIds.has(edge.id)) {
            issues.push({ level: 'error', message: `Duplicate edge id: ${edge.id}` });
        }
        seenEdgeIds.add(edge.id);

        const from = nodeById.get(edge.from);
        const to = nodeById.get(edge.to);
        if (!from) {
            issues.push({ level: 'error', message: `Edge ${edge.id}: unknown from node ${edge.from}` });
        }
        if (!to) {
            issues.push({ level: 'error', message: `Edge ${edge.id}: unknown to node ${edge.to}` });
        }
        if (from && to && from.id === to.id) {
            issues.push({ level: 'error', message: `Edge ${edge.id}: from and to are the same` });
        }

        if (from && to) {
            const path = resolveEdgePath(network, edge);
            if (path.length < 2) {
                issues.push({ level: 'error', message: `Edge ${edge.id}: could not resolve path` });
            } else {
                const start = path[0];
                const end = path[path.length - 1];
                if (gameCoordDistance(start, [from.x, from.y]) > ENDPOINT_EPSILON) {
                    issues.push({
                        level: 'warning',
                        message: `Edge ${edge.id}: path start does not match node ${edge.from}`,
                    });
                }
                if (gameCoordDistance(end, [to.x, to.y]) > ENDPOINT_EPSILON) {
                    issues.push({
                        level: 'warning',
                        message: `Edge ${edge.id}: path end does not match node ${edge.to}`,
                    });
                }
            }
        }
    }

    const components = connectedComponents(network);
    if (components.length > 1) {
        issues.push({
            level: 'warning',
            message: `Road network has ${components.length} disconnected components`,
        });
    }

    return issues;
}

function connectedComponents(network: RoadNetwork): string[][] {
    const nodeIds = network.nodes.map((n) => n.id);
    const adj = new Map<string, Set<string>>();
    for (const id of nodeIds) {
        adj.set(id, new Set());
    }
    for (const edge of network.edges) {
        adj.get(edge.from)?.add(edge.to);
        adj.get(edge.to)?.add(edge.from);
    }

    const visited = new Set<string>();
    const components: string[][] = [];

    for (const start of nodeIds) {
        if (visited.has(start)) continue;
        const stack = [start];
        const component: string[] = [];
        visited.add(start);
        while (stack.length > 0) {
            const id = stack.pop()!;
            component.push(id);
            for (const next of adj.get(id) ?? []) {
                if (!visited.has(next)) {
                    visited.add(next);
                    stack.push(next);
                }
            }
        }
        components.push(component);
    }

    return components;
}
