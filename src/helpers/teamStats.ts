import type Match from "../models/Match.ts";
import type TeamStats from '../models/TeamStats';

export function teamStats(team: number, matches: Match[]): TeamStats {
    const stats: Record<string, TeamStats> = {};

    stats[team] = {
        id: team,
        played: 0,
        mapPlayed: 0,
        won: 0,
        mapWon: 0,
        lost: 0,
        mapLost: 0,
        points: 0,
        scored: 0,
        conceded: 0,
    };

    matches.forEach(({ team1, team2, games }) => {
        let winner = 0;

        games.forEach(({ score1, score2 }) => {
            if (score1 === null || score2 === null) {
                return;
            }

            if (team1 === team) {
                stats[team].scored += score1;
                stats[team].conceded += score2;

                if (score1 > score2) {
                    stats[team].mapWon++;
                    winner++;
                } else {
                    stats[team].mapLost++;
                    winner--;
                }

                stats[team].mapPlayed++;
            } else if (team2 === team) {
                stats[team].scored += score2;
                stats[team].conceded += score1;

                if (score2 > score1) {
                    stats[team].mapWon++;
                    winner++;
                } else {
                    stats[team].mapLost++;
                    winner--;
                }

                stats[team].mapPlayed++;
            }
        });

        if (winner === 0) {
            return;
        }

        if (winner > 0) {
            stats[team].won++;
            stats[team].points += 3;
        } else {
            stats[team].lost++;
        }

        stats[team].played++;
    });

    return stats[team];
}