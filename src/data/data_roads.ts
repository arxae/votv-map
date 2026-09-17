import type { RoadNetworkData } from './types';

/** Junctions and edges only — POI positions come from data_poi.ts (use Poi.Name in edges). */
export const roadNetworkData: RoadNetworkData = {
    junctions: [
        { id: 'L-junction', x: -150, y: 10 },
        { id: 'K-junction', x: -215, y: 85 },
        { id: 'pre-Q-junction', x: -302, y: 253 },
        { id: 'Q-junction', x: -302, y: 253 },
    ],
    edges: [
        { id: 'alpha-to-L-junction', from: 'Alpha', to: 'L-junction', path: [
                [-45, -15],
                [-95, -15],
                [-125, 32],
                [-142, 32]
            ]
        },
        { id: 'L-junction-to-L', from: 'L-junction', to: 'Lima', path: [
                [-150, 0],
                [-155, -10],
                [-165, -17],
                [-175, -17]
            ]
        },
        { id: 'L-junction-to-K-junction', from: 'L-junction', to: 'K-junction', path: [
                [-180, 45],
                [-200, 57]
            ]
        },
        { id: 'K-junction-to-K', from: 'K-junction', to: 'Kilo'},
        { id: 'K-junction-to-pre-Q', from: 'K-junction', to: 'pre-Q-junction', path: [
                [-272, 175],
                [-272, 190],
                [-272, 200],
                [-280, 208],
                [-290, 210],
                [-298, 220]
            ]
        },
        { id: '', from: '', to: ''}
    ]
};
