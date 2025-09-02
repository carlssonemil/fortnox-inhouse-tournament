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
    .sort((a, b) => {
        if (b.kills !== a.kills) {
            return b.kills - a.kills;
        }

        const aKD = a.kills / (a.deaths || 1);
        const bKD = b.kills / (b.deaths || 1);

        return bKD - aKD;
    })
    .map((participant: Participant, index: number) => {
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

    return `
        <tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
            <td class="border p-4 text-left ${bg}">${participant.firstname} <strong>${participant.nickname}</strong> ${participant.surname}</td>
            <td class="border p-4 text-left ${bg}">${teamName(team?.team)}</td>
            <td class="border p-4 text-right ${bg}">${stats.played}</td>
            <td class="border p-4 text-right ${bg}">${stats.won}</td>
            <td class="border p-4 text-right ${bg}">${stats.lost}</td>
            <td class="border p-4 text-right ${bg}">${participant.kills}</td>
            <td class="border p-4 text-right ${bg}">${participant.deaths}</td>
            <td class="border p-4 text-right ${bg}">${kd.toFixed(2).replace(/[.,]00$/, '')}</td>
        </tr>
    `
})

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Statistik</h1>
  
  <table class="w-full border-collapse border">
    <thead>
        <tr>
            <th class="p-4 text-left">Spelare</th>
            <th class="p-4 text-left">Lag</th>
            <th class="p-4 text-right">Matcher</th>
            <th class="p-4 text-right">Vinster</th>
            <th class="p-4 text-right">Förluster</th>
            <th class="p-4 text-right">K</th>
            <th class="p-4 text-right">D</th>
            <th class="p-4 text-right">K/D</th>
        </tr>
    </thead>
    <tbody>
        ${participantList.join('')}
    </tbody>
  </table>
`