import type PlayerStats from './PlayerStats';

export default interface Game {
    score1: number|null;
    score2: number|null;
    map: string|null;
    stats: PlayerStats[]|null;
    url: string|null;
}