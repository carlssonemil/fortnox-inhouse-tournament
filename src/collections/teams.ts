import type Team from '../models/Team';
import participants from "./participants.ts";
import type Participant from '../models/Participant';

const teams: Team[] = [
    { team: 1, name: 'team_BJOERN', members: [] },
    { team: 2, name: 'team_Cuuurl', members: [] },
    { team: 3, name: 'team_Krak3N', members: [] },
    { team: 4, name: 'team_Units', members: [] },
];

teams.forEach((team: Team) => {
    participants.forEach((participant: Participant) => {
        if (participant.team === team.team) {
            team.members.push(participant);
        }
    });
});

export default teams;