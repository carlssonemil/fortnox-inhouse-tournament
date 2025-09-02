import teams from '../collections/teams'
import type Team from '../models/Team';

export function getTeams(): string {
    return teams.map((team: Team) => {

        return `
            <div class="md:grid md:grid-flow-row md:mr-2 mb-4 md:mb-0">
                <table class="w-full border-collapse border">
                    <caption class="caption-top">${team.name}</caption>
                    <tbody>
                        ${team.members
                            .slice()
                            .sort((a, b) => (b.captain ? 1 : 0) - (a.captain ? 1 : 0))
                            .map((member) => {
                            return `<tr>
                                <td class="border p-4 text-left ${member.captain ? 'bg-yellow-200': ''}">${member.firstname} <strong>${member.nickname}</strong> ${member.surname}</td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }).join('');
}