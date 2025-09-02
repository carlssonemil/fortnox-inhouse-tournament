import type Match from '../models/Match';
import { MAP } from '../constants';
import { extractGameStats } from '../helpers/extractGameStats';

const matches: Match[] = [
    {
        group: 1, team1: 1, team2: 2, games: [
            { score1: 13, score2: 2, map: MAP.MIRAGE, stats: extractGameStats(2, 1, MAP.MIRAGE), url: null },
            { score1: 13, score2: 2, map: MAP.DUST2, stats: extractGameStats(1, 2, MAP.DUST2), url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
    {
        group: 1, team1: 2, team2: 3, games: [
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
    {
        group: 1, team1: 3, team2: 4, games: [
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
    {
        group: 1, team1: 4, team2: 1, games: [
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
    {
        group: 1, team1: 1, team2: 3, games: [
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
    {
        group: 1, team1: 4, team2: 2, games: [
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null },
            { score1: null, score2: null, map: null, stats: null, url: null }
        ]
    },
];

export default matches;