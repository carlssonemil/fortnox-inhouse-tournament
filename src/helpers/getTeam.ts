import teams from '../collections/teams'
import type Team from '../models/Team';

export function getTeam(team: number): Team | undefined {
    return teams.find((t: Team) => t.team === team);
}