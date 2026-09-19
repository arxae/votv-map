import { pois } from '../data/data_poi';
import { roadNetworkData } from '../data/data_roads';
import type { Poi, RoadNetwork, RoadNetworkData } from '../data/types';

export function resolveRoadNetwork(
    allPois: Poi[],
    data: RoadNetworkData
): RoadNetwork {
    const poiByName = new Map(allPois.map((p) => [p.Name, p]));
    const junctionById = new Map(data.junctions.map((j) => [j.id, j]));

    for (const junction of data.junctions) {
        if (poiByName.has(junction.id)) {
            throw new Error(
                `Road junction id "${junction.id}" matches a POI name; use a different junction id`
            );
        }
    }

    const endpointIds = new Set<string>();
    for (const junction of data.junctions) {
        endpointIds.add(junction.id);
    }
    for (const edge of data.edges) {
        endpointIds.add(edge.from);
        endpointIds.add(edge.to);
    }

    const nodes: RoadNetwork['nodes'] = [];
    const added = new Set<string>();

    for (const id of endpointIds) {
        if (added.has(id)) continue;

        const junction = junctionById.get(id);
        if (junction) {
            nodes.push({ id, x: junction.x, y: junction.y });
            added.add(id);
            continue;
        }

        const poi = poiByName.get(id);
        if (poi) {
            nodes.push({ id, x: poi.X, y: poi.Y });
            added.add(id);
            continue;
        }

        throw new Error(
            `Road edge references unknown node "${id}" (not a junction and not a POI name)`
        );
    }

    return { nodes, edges: data.edges };
}

export function getRoadNetwork(): RoadNetwork {
    return resolveRoadNetwork(pois, roadNetworkData);
}
