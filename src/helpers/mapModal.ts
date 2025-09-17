import matches from '../collections/matches';
import { teamName } from './teamName';
import { getFullname } from './getFullname';
import type TeamStats from '../models/TeamStats';
import { mapStats } from './mapStats';

export function mapModal(team1: number, team2: number, map: string|null, id: string) {
    const game = matches.find(m => m.team1 === team1 && m.team2 === team2)?.games.find(g => g.map === map);

    if (!game?.stats) {
        return '';
    }

    let team1Stats = game.stats
        .filter((member) => member.team === team1)
        .slice()
        .sort((a, b) => {
            if (b.damage !== a.damage) {
                return b.damage - a.damage;
            }

            return b.damage - a.damage;
        });

    let team2Stats = game.stats
        .filter((member) => member.team === team2)
        .slice()
        .sort((a, b) => {
            if (b.damage !== a.damage) {
                return b.damage - a.damage;
            }

            return b.damage - a.damage;
        });

    return `
        <el-dialog>
            <dialog id="stats-modal-${id}" tabindex="-1" aria-hidden="true" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                <el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>
                
                <div tabindex="0" class="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                    <el-dialog-panel class="relative transform overflow-hidden rounded-lg p-8 bg-white text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:ml-8 md:mr-8 sm:w-full md:w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                        <h2 class="md:ml-3 text-center font-bold md:text-2xl sm:tracking-tight mb-6">
                            ${game.score1 !== null && game.score2 !== null ? `<div class="font-normal md:text-5xl inline-block relative mr-6 md:-bottom-2">${game?.score1 > game?.score2 ? `<span class="font-bold">${game.score1}</span>` : `<span class="font-light opacity-60">${game.score1}</span>`}</div>` : ''}
                            ${game.map}
                            ${game.score1 !== null && game.score2 !== null ? `<div class="font-normal md:text-5xl inline-block relative ml-6 md:-bottom-2">${game?.score2 > game?.score1 ? `<span class="font-bold">${game.score2}</span>` : `<span class="font-light opacity-60">${game.score2}</span>`}</div>` : ''}
                        </h2>
                        <table class="w-full tabl-auto">
                            <thead>
                                <tr>
                                    <th class="p-4 text-left max-w-64">${teamName(team1)}</th>
                                    <th class="p-4 text-left">K</th>
                                    <th class="p-4 text-left">A</th>
                                    <th class="p-4 text-left">D</th>
                                    <th class="p-4 text-left hidden md:table-cell">DMG</th>
                                    <th class="p-4 text-left hidden md:table-cell">ADR</th>
                                    <th class="p-4 text-left hidden md:table-cell">2K</th>
                                    <th class="p-4 text-left hidden md:table-cell">3K</th>
                                    <th class="p-4 text-left hidden md:table-cell">4K</th>
                                    <th class="p-4 text-left hidden md:table-cell">5K</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${team1Stats.map((member) => {
                                    let stats: TeamStats = mapStats(team1, game);
                                    let adr = member.damage / (stats.scored + stats.conceded);
                                    
                                    return `<tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                                        <td class="border p-4 text-left max-w-64">${getFullname(member.name)}</td>
                                        <td class="border p-4 text-left">${member.kills}</td>
                                        <td class="border p-4 text-left">${member.assists}</td>
                                        <td class="border p-4 text-left">${member.deaths}</td>
                                        <td class="border p-4 text-left hidden md:table-cell">${member.damage}</td>
                                        <td class="border p-4 text-left hidden md:table-cell">${adr.toFixed(0)}</td>
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
                                    <th class="p-4 text-left max-w-64">${teamName(team2)}</th>
                                    <th class="p-4 text-left">K</th>
                                    <th class="p-4 text-left">A</th>
                                    <th class="p-4 text-left">D</th>
                                    <th class="p-4 text-left hidden md:table-cell">DMG</th>
                                    <th class="p-4 text-left hidden md:table-cell">ADR</th>
                                    <th class="p-4 text-left hidden md:table-cell">2K</th>
                                    <th class="p-4 text-left hidden md:table-cell">3K</th>
                                    <th class="p-4 text-left hidden md:table-cell">4K</th>
                                    <th class="p-4 text-left hidden md:table-cell">5K</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${team2Stats.map((member) => {
                                    let stats: TeamStats = mapStats(team1, game);
                                    let adr = member.damage / (stats.scored + stats.conceded);
                                    
                                    return `<tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                                        <td class="border p-4 text-left max-w-64">${getFullname(member.name)}</td>
                                        <td class="border p-4 text-left">${member.kills}</td>
                                        <td class="border p-4 text-left">${member.assists}</td>
                                        <td class="border p-4 text-left">${member.deaths}</td>
                                        <td class="border p-4 text-left hidden md:table-cell">${member.damage}</td>
                                        <td class="border p-4 text-left hidden md:table-cell">${adr.toFixed(0)}</td>
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