export const GAME_MAP_SIZE = 1489.995; // Game to leaflet scale

export function gameToLeaflet(x: number, y: number): [number, number] {
    return [-y + GAME_MAP_SIZE / 2, x + GAME_MAP_SIZE / 2];
}
