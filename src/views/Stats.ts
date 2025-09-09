import type Team from '../models/Team';
import type Participant from '../models/Participant';

import participants from '../collections/participants';
import teams from '../collections/teams';
import { teamName } from '../helpers/teamName';
import { teamStats } from '../helpers/teamStats';
import matches from '../collections/matches';
import type TeamStats from '../models/TeamStats';

const participantList: string[] = participants
    .slice()
    .map((participant: Participant) => {
        let team: Team | undefined = teams.find(team => team.team === participant.team);
        if (!team) return { participant, adr: 0 };

        let stats: TeamStats = teamStats(team.team, matches);
        let adr = participant.damage / (stats.scored + stats.conceded);

        return { participant, adr };
    })
    .sort((a, b) => b.adr - a.adr)
    .map(({ participant }, index: number) => {
        let kd = participant.kills / participant.deaths || 0;

        let bg = '';

        if (index === 0) {
            bg = 'bg-yellow-200';
        } else if (index === 1) {
            bg = 'bg-gray-200';
        } else if (index === 2) {
            bg = 'bg-amber-100';
        }

        let team: Team | undefined = teams.find(team => team.team === participant.team);

        if (!team) {
            return '';
        }

        let stats: TeamStats = teamStats(team.team, matches);

        let adr = participant.damage / (stats.scored + stats.conceded);
        let avgK = participant.kills / stats.mapPlayed;
        let avgA = participant.assists / stats.mapPlayed;
        let avgD = participant.deaths / stats.mapPlayed;

        return `
            <tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                <td class="border-b border-x p-4 text-left ${bg}">${participant.firstname} <strong>${participant.nickname}</strong> ${participant.surname}<span class="block font-light text-sm italic">${teamName(team.team)}</span></td>
                <td class="border-b border-x p-4 text-right ${bg}">${participant.kills}</td>
                <td class="border-b border-x p-4 text-right ${bg}">${participant.deaths}</td>
                <td class="border-b border-x p-4 text-right ${bg}">${kd.toFixed(2).replace(/[.,]00$/, '')}</td>
                <td class="border-b border-x p-4 text-right hidden md:table-cell ${bg}">${participant.damage}</td>
                <td class="border-b border-x p-4 text-right hidden md:table-cell ${bg}">${adr.toFixed(0)}</td>
                <td class="border-b border-x p-4 text-right hidden md:table-cell ${bg}">${avgK.toFixed(0)} / ${avgA.toFixed(0)} / ${avgD.toFixed(0)}</td>
            </tr>
        `
    });

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Statistik</h1>
  
  <table class="w-full table-auto">
    <thead class="md:sticky md:top-0 border-b md:border-0 bg-green-50 ring-1">
        <tr>
            <th class="p-4 text-left">Spelare</th>
            <th class="p-4 text-right">Kills</th>
            <th class="p-4 text-right">Deaths</th>
            <th class="p-4 text-right">K/D</th>
            <th class="p-4 text-right hidden md:table-cell">Damage</th>
            <th class="p-4 text-right hidden md:table-cell">ADR</th>
            <th class="p-4 text-right hidden md:table-cell">AVG</th>
        </tr>
    </thead>
    <tbody>
        ${participantList.join('')}
    </tbody>
  </table>
`