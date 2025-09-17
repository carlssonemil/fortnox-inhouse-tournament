import type TeamStats from '../models/TeamStats';
import type Game from '../models/Game';

export function mapStats(team: number, map: Game): TeamStats {
    const stats: Record<string, TeamStats> = {};

    stats[team] = {
        lost: 0,
        mapLost: 0,
        mapPlayed: 0,
        mapWon: 0,
        played: 0,
        points: 0,
        won: 0,
        id: team,
        scored: 0,
        conceded: 0
    };

    if (map.score1 === null || map.score2 === null) {
        return stats[team];
    }

    stats[team].scored += map.score1;
    stats[team].conceded += map.score2;

    return stats[team];
}