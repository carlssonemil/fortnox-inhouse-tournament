import { teamName } from './teamName';
import type Match from '../models/Match';
import type Game from '../models/Game';
import { mapModal } from "./mapModal";

export function getGroupMatches(groupNumber: number, matches: Match[]) {
    const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>`;

    const chartIcon = `<svg xmlns="http://www.w3.org/2000/svg" vfill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M12 16v5"></path><path d="M16 14v7"></path><path d="M20 10v11"></path><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path><path d="M4 18v3"></path><path d="M8 14v7"></path></svg>`;

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
            let randomId = Math.random().toString(36).substring(2, 15);

            if (game.url) {
                gameLink = `
                    <div class="inline-block float-right match-icons">
                        <a class="text-sm" href="${game.url}" target="_blank">Matchlänk ${linkIcon}</a>
                    </div>
                `
            }

            if (game.stats) {
                gameStatsButton = `
                    <div class="inline-block float-right match-icons">
                        <button class="text-sm rounded-lg uppercase hover:cursor-pointer focus:outline-0" command="show-modal" commandfor="stats-modal-${randomId}">Stats ${chartIcon}</button>
                    </div>
               `;
            }

            let gameIsPlayed = game.score1 !== null && game.score2 !== null;

            markupInner += `
                <table class="match-info w-full">
                    <caption class="caption-top rounded-lg uppercase shadow">${game.map ? game.map : '-'} ${gameLink + gameStatsButton}</caption>
                    <tbody>
                        <tr>
                            <td class="p-2 text-left ${gameIsPlayed ? (game.score1! > game.score2! ? `font-bold` : `opacity-50`) : (!matchIsPlayed ? '' : 'line-through')}">${teamName(match.team1)}</td>
                            <td class="p-2 text-right ${gameIsPlayed ? (game.score1! > game.score2! ? `font-bold` : `opacity-50`) : ''}">${game.score1 !== null ? game.score1 : '-'}</td>
                        </tr>
                        <tr>
                            <td class="p-2 text-left ${gameIsPlayed ? (game.score2! > game.score1! ? `font-bold` : `opacity-50`) : (!matchIsPlayed ? '' : 'line-through')}">${teamName(match.team2)}</td>
                            <td class="p-2 text-right ${gameIsPlayed ? (game.score2! > game.score1! ? `font-bold` : `opacity-50`) : ''}">${game.score2 !== null ? game.score2 : '-'}</td>
                        </tr>
                    </tbody>
                </table>
                ${mapModal(match.team1, match.team2, game?.map, randomId)}
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