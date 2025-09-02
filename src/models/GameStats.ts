import type PlayerStats from './PlayerStats';

export default interface GameStats {
    team1: number;
    team2: number;
    map: string;
    stats: PlayerStats[];
}