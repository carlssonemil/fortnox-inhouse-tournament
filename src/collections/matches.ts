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
            { score1: 11, score2: 13, map: MAP.MIRAGE, stats: extractGameStats(2, 3, MAP.MIRAGE), url: null },
            { score1: 13, score2: 6, map: MAP.NUKE, stats: extractGameStats(3, 2, MAP.NUKE), url: null },
            { score1: 19, score2: 17, map: MAP.ANCIENT, stats: extractGameStats(3, 2, MAP.ANCIENT), url: null }
        ]
    },
    {
        group: 1, team1: 3, team2: 4, games: [
            { score1: 10, score2: 13, map: MAP.ANCIENT, stats: extractGameStats(3, 4, MAP.ANCIENT), url: null },
            { score1: 16, score2: 14, map: MAP.MIRAGE, stats: extractGameStats(3, 4, MAP.MIRAGE), url: null },
            { score1: 16, score2: 13, map: MAP.OVERPASS, stats: extractGameStats(3, 4, MAP.OVERPASS), url: null }
        ]
    },
    {
        group: 1, team1: 4, team2: 1, games: [
            { score1: 7, score2: 13, map: MAP.ANCIENT, stats: extractGameStats(4, 1, MAP.ANCIENT), url: null },
            { score1: 4, score2: 13, map: MAP.DUST2, stats: extractGameStats(1, 4, MAP.DUST2), url: null },
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