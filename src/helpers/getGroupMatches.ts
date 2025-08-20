import { teamName } from './teamName';
import type Match from '../models/Match';
import type Game from '../models/Game';

export function getGroupMatches(groupNumber: number, matches: Match[]) {
    const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>`;

    const groupGames = matches.filter((match: { group: number; }) => match.group === groupNumber);
    if (groupGames.length === 0) return [];

    return groupGames.map((match: Match) => {
        let markup = `
                <div class="mb-6">
                    <div class="rounded-lg py-6 text-xs md:text-base">
                        <div class="flex">
        `;

        markup += match?.games.map((game: Game) => {
            let markupInner = `
                <div class="grow px-2">
            `;

            let gameLink = '';

            if (game.url) {
                gameLink = `
                    <div class="flex justify-center match-icons py-4">
                        <a class="text-sm" href="${game.url}" target="_blank">Matchlänk ${linkIcon}</a>
                    </div>
                `
            }

            markupInner += `
                <table class="match-info w-full rounded bg-white shadow rounded-lg">
                    <caption class="caption-top shadow">${game.map}</caption>
                    <tbody>
                        <tr>
                            <td class="p-4 text-left ${game.score1 > game.score2 ? `font-bold` : `opacity-50`}">${teamName(match.team1)}</td>
                            <td class="p-4 text-right text-right ${game.score1 > game.score2 ? `font-bold` : `opacity-50`}">${game.score1}</td>
                        </tr>
                        <tr>
                            <td class="p-4 text-left ${game.score2 > game.score1 ? `font-bold` : `opacity-50`}">${teamName(match.team2)}</td>
                            <td class="p-4 text-right text-right ${game.score2 > game.score1 ? `font-bold` : `opacity-50`}">${game.score2}</td>
                        </tr>
                    </tbody>
                </table>
            
                ${gameLink}
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