import teams from '../collections/teams';

export const teamName= (teamId: number | undefined) => {
    if (teamId === undefined) {
        return '';
    }

    return teams.map((teamMap) => {
        if (teamMap.team === teamId) {
            return teamMap.name;
        }
    }).join('')
}