import { teamName } from './teamName';
import type Match from '../models/Match';
import type TeamStats from '../models/TeamStats';

export function getGroupStandings(groupNumber: number, matches: Match[]) {
    const teams: Record<string, TeamStats> = {};

    // Filter games by group
    const groupGames = matches.filter(match => match.group === groupNumber);
    if (groupGames.length === 0) return [];

    // Process each game in the group
    groupGames.forEach(({ team1, team2, games }) => {
        [team1, team2].forEach(team => {
            if (!teams[team]) {
                teams[team] = {
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
            }
        });

        // Update stats
        teams[team1].played++
        teams[team2].played++;

        let winner = 0;

        games.forEach(({ score1, score2 }) => {
           teams[team1].mapPlayed++;
           teams[team2].mapPlayed++;
           teams[team1].scored += score1;
           teams[team1].conceded += score2;
           teams[team2].scored += score2;
           teams[team2].conceded += score1;

            if (score1 > score2) {
                teams[team1].mapWon++;
                teams[team2].mapLost++;

                winner++;
            } else {
                teams[team2].mapWon++;
                teams[team1].mapLost++;

                winner--;
            }
        });

        if (winner > 0) {
            teams[team1].won++;
            teams[team1].points += 3;
            teams[team2].lost++;
        } else {
            teams[team2].won++;
            teams[team2].points += 3;
            teams[team1].lost++;
        }
    });

    // Convert to array and sort
    const sorted = Object.values(teams).sort((a: any, b: any) =>
        b.points - a.points ||
        (b.scored - b.conceded) - (a.scored - a.conceded) ||
        b.scored - a.scored
    );

    // Add ranking
    let sortedMap = sorted.map((team: any, index: number) => ({
        rank: index + 1,
        ...team
    }));

    return sortedMap.map((team, index) => {
        const { id, won, lost, points, scored, conceded } = team;
        const rank = index + 1;

        return `
                <tr>
                    <td class="border p-4 text-left font-bold">${rank}. ${teamName(id)}</td>
                    <td class="border p-4 text-left">${won}</td>
                    <td class="border p-4 text-left">${lost}</td>
                    <td class="border p-4 text-left">${scored - conceded}</td>
                    <td class="border p-4 text-left">${points}</td>
                </tr>
            `
    }).join('')
}