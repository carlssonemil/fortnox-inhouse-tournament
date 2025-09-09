import { teamName } from './teamName';
import type Match from '../models/Match';
import type Game from '../models/Game';
import { getFullname } from './getFullname';

export function getGroupMatches(groupNumber: number, matches: Match[]) {
    const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>`;

    const groupGames = matches.filter((match: { group: number; }) => match.group === groupNumber);
    if (groupGames.length === 0) return [];

    return groupGames.map((match: Match) => {
        let matchIsPlayed = match?.games[0]?.score1 !== null && match?.games[0]?.score2 !== null;
        let matchScore = { team1: 0, team2: 0 };

        match?.games.forEach((game: Game) => {
            if (game.score1 !== null && game.score2 !== null) {
                if (game.score1 > game.score2) {
                    matchScore.team1++;
                } else if (game.score2 > game.score1) {
                    matchScore.team2++;
                }
            }
        });

        let markup = `
                <div class="mb-12">
                    <h2 class="md:ml-3 text-center font-bold md:text-2xl sm:tracking-tight mb-6">
                        ${matchIsPlayed ? `<div class="font-normal md:text-5xl inline-block relative mr-6 md:-bottom-2">${matchScore.team1 > 1 ? `<span class="font-bold">${matchScore.team1}</span>` : `<span class="font-light opacity-60">${matchScore.team1}</span>`}</div>` : ''}
                        ${matchIsPlayed && matchScore.team2 > 1 ? `<span class="opacity-60">${teamName(match.team1)}</span>` : `${teamName(match.team1)}`} 
                            <span class="font-light">vs.</span> 
                        ${matchIsPlayed && matchScore.team1 > 1 ? `<span class="opacity-60">${teamName(match.team2)}</span>` : `${teamName(match.team2)}`} 
                        ${matchIsPlayed ? `<div class="font-normal md:text-5xl inline-block relative ml-6 md:-bottom-2">${matchScore.team2 > 1 ? `<span class="font-bold">${matchScore.team2}</span>` : `<span class="font-light opacity-60">${matchScore.team2}</span>`}</div>` : ''}
                    </h2>
                    <div class="rounded-lg p-4 pt-8 md:p-8 md:pt-10 text-xs md:text-base bg-white shadow">
                        <div class="md:flex">
        `;

        markup += match?.games.map((game: Game) => {
            let markupInner = `
                <div class="grow px-4 mb-4 md:mb-0">
            `;

            let gameLink = '';
            let gameStatsButton = '';
            let gameStats = '';
            let randomId = Math.random().toString(36).substring(2, 15);

            if (game.url) {
                gameLink = `
                    <div class="inline-block float-right match-icons">
                        <a class="text-sm" href="${game.url}" target="_blank">Matchlänk ${linkIcon}</a>
                    </div>
                `
            }

            if (game.stats) {
                let team1 = game.stats
                    .filter((member) => member.team === match.team1)
                    .slice()
                    .sort((a, b) => {
                        if (b.damage !== a.damage) {
                            return b.damage - a.damage;
                        }

                        return b.damage - a.damage;
                    });

                let team2 = game.stats
                    .filter((member) => member.team === match.team2)
                    .slice()
                    .sort((a, b) => {
                        if (b.damage !== a.damage) {
                            return b.damage - a.damage;
                        }

                        return b.damage - a.damage;
                    });

                gameStatsButton = `
                    <div class="inline-block float-right match-icons mr-4">
                        <button class="text-sm" command="show-modal" commandfor="stats-modal-${randomId}">Statistik ${linkIcon}</button>
                    </div>
               `;

                gameStats = `     
                    <el-dialog>
                        <dialog id="stats-modal-${randomId}" tabindex="-1" aria-hidden="true" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                            <el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>
                            
                            <div tabindex="0" class="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                                <el-dialog-panel class="relative transform overflow-hidden rounded-lg p-8 bg-white text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:ml-8 md:mr-8 sm:w-full md:w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                    <h2 class="md:ml-3 text-center font-bold md:text-2xl sm:tracking-tight mb-6">
                                        ${matchIsPlayed && game.score1 !== null && game.score2 !== null ? `<div class="font-normal md:text-5xl inline-block relative mr-6 md:-bottom-2">${game?.score1 > game?.score2 ? `<span class="font-bold">${game.score1}</span>` : `<span class="font-light opacity-60">${game.score1}</span>`}</div>` : ''}
                                        ${game.map}
                                        ${matchIsPlayed && game.score1 !== null && game.score2 !== null ? `<div class="font-normal md:text-5xl inline-block relative ml-6 md:-bottom-2">${game?.score2 > game?.score1 ? `<span class="font-bold">${game.score2}</span>` : `<span class="font-light opacity-60">${game.score2}</span>`}</div>` : ''}
                                    </h2>
                                    <table class="w-full tabl-auto">
                                        <thead>
                                            <tr>
                                                <th class="p-4 text-left max-w-64">${teamName(match.team1)}</th>
                                                <th class="p-4 text-left">K</th>
                                                <th class="p-4 text-left">A</th>
                                                <th class="p-4 text-left">D</th>
                                                <th class="p-4 text-left hidden md:table-cell">DMG</th>
                                                <th class="p-4 text-left hidden md:table-cell">2K</th>
                                                <th class="p-4 text-left hidden md:table-cell">3K</th>
                                                <th class="p-4 text-left hidden md:table-cell">4K</th>
                                                <th class="p-4 text-left hidden md:table-cell">5K</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${team1.map((member) => {
                                                return `<tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                                                    <td class="border p-4 text-left max-w-64">${getFullname(member.name)}</td>
                                                    <td class="border p-4 text-left">${member.kills}</td>
                                                    <td class="border p-4 text-left">${member.assists}</td>
                                                    <td class="border p-4 text-left">${member.deaths}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.damage}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy2ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy3ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy4ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy5ks}</td>
                                                </tr>`;
                                            }).join('')}
                                        </tbody>
                                    </table>
                                    
                                    <table class="w-full mt-8 table-auto">
                                        <thead>
                                            <tr>
                                                <th class="p-4 text-left max-w-64">${teamName(match.team2)}</th>
                                                <th class="p-4 text-left">K</th>
                                                <th class="p-4 text-left">A</th>
                                                <th class="p-4 text-left">D</th>
                                                <th class="p-4 text-left hidden md:table-cell">DMG</th>
                                                <th class="p-4 text-left hidden md:table-cell">2K</th>
                                                <th class="p-4 text-left hidden md:table-cell">3K</th>
                                                <th class="p-4 text-left hidden md:table-cell">4K</th>
                                                <th class="p-4 text-left hidden md:table-cell">5K</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${team2.map((member) => {
                                                return `<tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                                                    <td class="border p-4 text-left max-w-64">${getFullname(member.name)}</td>
                                                    <td class="border p-4 text-left">${member.kills}</td>
                                                    <td class="border p-4 text-left">${member.assists}</td>
                                                    <td class="border p-4 text-left">${member.deaths}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.damage}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy2ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy3ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy4ks}</td>
                                                    <td class="border p-4 text-left hidden md:table-cell">${member.enemy5ks}</td>
                                                </tr>`;
                                            }).join('')}
                                        </tbody>
                                    </table>
                                </el-dialog-panel>
                        </dialog>
                    </el-dialog>
                `
            }

            let gameIsPlayed = game.score1 !== null && game.score2 !== null;

            markupInner += `
                <table class="match-info w-full">
                    <caption class="caption-top rounded-lg uppercase shadow">${game.map ? game.map : '-'} ${gameLink + gameStatsButton}</caption>
                    <tbody>
                        <tr>
                            <td class="p-2 text-left ${gameIsPlayed ? (game.score1! > game.score2! ? `font-bold` : `opacity-50`) : (!matchIsPlayed ? '' : 'line-through')}">${teamName(match.team1)}</td>
                            <td class="p-2 text-right ${gameIsPlayed ? (game.score1! > game.score2! ? `font-bold` : `opacity-50`) : ''}">${game.score1 ? game.score1 : '-'}</td>
                        </tr>
                        <tr>
                            <td class="p-2 text-left ${gameIsPlayed ? (game.score2! > game.score1! ? `font-bold` : `opacity-50`) : (!matchIsPlayed ? '' : 'line-through')}">${teamName(match.team2)}</td>
                            <td class="p-2 text-right ${gameIsPlayed ? (game.score2! > game.score1! ? `font-bold` : `opacity-50`) : ''}">${game.score2 ? game.score2 : '-'}</td>
                        </tr>
                    </tbody>
                </table>
                ${gameStats}
            `

            markupInner += `
                </div>
            `;

            return markupInner;
        }).join('');

        markup += `
                    </div>
                </div>
            </div>
        `;

        return markup;
    }).join('')
}