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

        let winner = 0;

        games.forEach(({ score1, score2 }) => {
            if (score1 === null || score2 === null) {
                return;
            }

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

        if (winner === 0) {
            return;
        }

        teams[team1].played++
        teams[team2].played++;

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
    const sorted = Object.values(teams).sort((a: any, b: any) => {
        // Sort by points
        if (b.points !== a.points) return b.points - a.points;

        // Sort by round difference
        const aDiff = a.scored - a.conceded;
        const bDiff = b.scored - b.conceded;
        if (bDiff !== aDiff) return bDiff - aDiff;

        // Sort by head-to-head score
        const directMatch = matches.find(
            m => (m.team1 === a.id && m.team2 === b.id) || (m.team1 === b.id && m.team2 === a.id)
        );

        if (directMatch) {
            let aScore = 0, bScore = 0;
            directMatch.games.forEach(({ score1, score2 }) => {
                if (score1 !== null && score2 !== null) {
                    if (directMatch.team1 === a.id) {
                        aScore += score1;
                        bScore += score2;
                    } else {
                        aScore += score2;
                        bScore += score1;
                    }
                }
            });
            if (aScore !== bScore) return bScore - aScore;
        }

        return 0;
    });

    // Add ranking
    let sortedMap = sorted.map((team: any, index: number) => ({
        rank: index + 1,
        ...team
    }));

    return sortedMap.map((team, index) => {
        const { id, won, lost, points, scored, conceded, played } = team;
        const rank = index + 1;
        const rd = scored - conceded;

        return `
                <tr>
                    <td class="border p-4 text-left font-bold">${rank}. ${teamName(id)}</td>
                    <td class="border p-4 text-left hidden md:table-cell">${played}</td>
                    <td class="border p-4 text-left">${won}</td>
                    <td class="border p-4 text-left">${lost}</td>
                    <td class="border p-4 text-left">${rd > 0 ? '+' + rd : rd}</td>
                    <td class="border p-4 text-left">${points}</td>
                </tr>
            `
    }).join('')
}