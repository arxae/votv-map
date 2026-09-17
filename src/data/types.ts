export type PanelTab = 'info' | 'points' | 'visibility' | 'settings'

export interface Line {
    Name?: string;
    Category?: string;
    Color: string;
    Fill?: string;
    LineThickness: number;
    Coordinates: [number, number][];
}

export interface Poi {
    Name: string;
    Description?: string;
    RelatedImages?: string[];
    Category?: PoiCategory;
    Icon: string;
    IconSize: number;
    X: number
    Y: number
}

export type PoiCategory = 
    '' |
    'Satellite Dishes' | 
    'Transformers' | 
    'CR' |
    'Furfur Totems' |
    'Metal Tiles' |
    'Plushes' |
    'Points of Interest' |
    'Chicken Sandwiches' |
    'Skulls' |
    'Halloween Pumpkins' |
    'Easter Eggs' |
    'Tools' |
    'KerfurO Accessories' |
    'KerfurO Parts' |
    'Notes';

export type PersistenceData = {
    version: 1;
    visibleCategories: Record<string, boolean>;
    visibleLines: Record<string, boolean>;
}

/** Graph vertex in game coordinates (same space as Poi X/Y). */
export interface RoadNode {
    id: string;
    x: number;
    y: number;
}

/** Road-only vertex (not a POI). Id must not match a Poi.Name. */
export interface RoadJunction {
    id: string;
    x: number;
    y: number;
}

/**
 * Undirected road segment. Endpoints must exist in `nodes`.
 * Optional `path` bends between endpoints; omit for a straight segment.
 */
export interface RoadEdge {
    id: string;
    from: string;
    to: string;
    path?: [number, number][];
    /** Reserved for future rules (e.g. shortcuts). Defaults to road. */
    kind?: 'road' | 'shortcut';
}

/** Authoring format: POI endpoints come from data_poi.ts at resolve time. */
export interface RoadNetworkData {
    junctions: RoadJunction[];
    edges: RoadEdge[];
}

export interface RoadNetwork {
    nodes: RoadNode[];
    edges: RoadEdge[];
}