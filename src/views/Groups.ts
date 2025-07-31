import type Game from "../models/Game.ts";

const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>`

const teamNames = [
    { id: 1, name: 'BJOERN' },
    { id: 2, name: 'Cuuurl' },
    { id: 3, name: 'Units' },
    { id: 4, name: 'Atlas' },
    { id: 5, name: 'f0rest' },
    { id: 6, name: 'GeT_RiGhT' },
    { id: 7, name: 'Krak3N' },
    { id: 8, name: 'wr0ng' },
];

const teamName= (teamId: number) => {
    return teamNames.map((teamMap) => {
        if (teamMap.id === teamId) {
            return teamMap.name;
        }
    }).join('')
}

const games: Game[] = [
    { group: 1, team1: 1, team2: 2, score1: 13, score2: 1, url: '/' },
    { group: 1, team1: 3, team2: 4, score1: 13, score2: 11, url: '/' },
    { group: 1, team1: 3, team2: 1, score1: 6, score2: 13, url: '/' },
    { group: 1, team1: 2, team2: 4, score1: 13, score2: 4, url: '/' },
    { group: 1, team1: 1, team2: 4, score1: 13, score2: 9, url: '/' },
    { group: 1, team1: 3, team2: 2, score1: 11, score2: 13, url: '/' },

    { group: 2, team1: 5, team2: 6, score1: 11, score2: 13, url: '/' },
    { group: 2, team1: 7, team2: 8, score1: 13, score2: 11, url: '/' },
    { group: 2, team1: 7, team2: 5, score1: 13, score2: 0, url: '/' },
    { group: 2, team1: 6, team2: 8, score1: 16, score2: 19, url: '/' },
    { group: 2, team1: 5, team2: 8, score1: 13, score2: 9, url: '/' },
    { group: 2, team1: 7, team2: 6, score1: 11, score2: 13, url: '/' },
];

function getGroupStandings(groupNumber: number, games: Game[]) {
    type TeamStats = {
        id: number;
        played: number;
        won: number;
        lost: number;
        points: number;
        scored: number;
        conceded: number;
    };

    const teams: Record<string, TeamStats> = {};

    // Filter games by group
    const groupGames = games.filter(game => game.group === groupNumber);
    if (groupGames.length === 0) return [];

    // Process each game in the group
    groupGames.forEach(({ team1, team2, score1, score2 }) => {
        [team1, team2].forEach(team => {
            if (!teams[team]) {
                teams[team] = {
                    id: team,
                    played: 0,
                    won: 0,
                    lost: 0,
                    points: 0,
                    scored: 0,
                    conceded: 0,
                };
            }
        });

        // Update stats
        teams[team1].played++
        teams[team2].played++;
        teams[team1].scored += score1;
        teams[team1].conceded += score2;
        teams[team2].scored += score2;
        teams[team2].conceded += score1;

        if (score1 > score2) {
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
                    <td class="border p-4 text-left font-bold">${rank}. team ${teamName(id)}</td>
                    <td class="border p-4 text-left">${won}</td>
                    <td class="border p-4 text-left">${lost}</td>
                    <td class="border p-4 text-left">${scored - conceded}</td>
                    <td class="border p-4 text-left">${points}</td>
                </tr>
            `
    }).join('')
}

function getGroupMatches(groupNumber: number, games: any) {
    const groupGames = games.filter((game: { group: number; }) => game.group === groupNumber);
    if (groupGames.length === 0) return [];

    return groupGames.map((game: any) => {
        let gameLink = '';

        if (game.url) {
            gameLink = `
                <div class="flex-col match-icons rounded-es-lg rounded-ee-lg bg-stone-900 px-6 py-4 space-y-2">
                    <a class="text-sm" href="${game.url}" target="_blank">Matchlänk ${linkIcon}</a>
                </div>
                `
        }

        return `
            <div class="mb-6">
                <div class="rounded-ss-lg rounded-se-lg bg-stone-200 px-6 py-6 space-y-2 text-xs md:text-base">
                    <div class="grid grid-flow-col grid-cols-2 pb-4">
                      <p class="${game.score1 > game.score2 ? `font-bold` : `opacity-50`}">team ${teamName(game.team1)}</p>
                      <p class="text-right ${game.score1 > game.score2 ? `font-bold` : `opacity-50`}">${game.score1}</p>
                    </div>
                    <div class="grid grid-flow-col grid-cols-2">
                      <p class="${game.score2 > game.score1 ? `font-bold` : `opacity-50`}">team ${teamName(game.team2)}</p>
                      <p class="text-right ${game.score2 > game.score1 ? `font-bold` : `opacity-50`}">${game.score2}</p>
                    </div>
                </div>
                
                ${gameLink}
            </div>
        `
    }).join('')
}
export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Gruppspel</h1>
  
  <div class="grid grid-flow-col grid-cols-2 items-start">
    <div class="grid grid-flow-row mr-2">
      <table class="w-full border-collapse border">
        <caption class="caption-top">
            Grupp A
        </caption>
        <thead>
            <tr>
                <th></th>
                <th class="p-4 text-left">W</th>
                <th class="p-4 text-left">L</th>
                <th class="p-4 text-left">RD</th>
                <th class="p-4 text-left">P</th>
            </tr>
        </thead>
        <tbody>
            ${getGroupStandings(1, games)}
        </tbody>
      </table>
      
      <div class="pt-12">
        ${getGroupMatches(1, games)}
      </div>
    </div>
    
    <div class="grid grid-flow-row ml-2">
      <table class="w-full border-collapse border">
        <caption class="caption-top">
            Grupp B
        </caption>
        <thead>
            <tr>
                <th></th>
                <th class="p-4 text-left">W</th>
                <th class="p-4 text-left">L</th>
                <th class="p-4 text-left">RD</th>
                <th class="p-4 text-left">P</th>
            </tr>
        </thead>
        <tbody>
            ${getGroupStandings(2, games)}
        </tbody>
      </table>
      
      <div class="pt-12">
        ${getGroupMatches(2, games)}
      </div>
    </div>
  </div>
`