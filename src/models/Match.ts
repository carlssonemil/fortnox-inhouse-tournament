import type Game from './Game';

export default interface Match {
    group: number;
    team1: number;
    team2: number;
    games: Game[];
}