import type Participant from '../models/Participant';
import matches from './matches';

const participants: Participant[] = [
    { firstname: 'Patrik', surname: 'Björn', nickname: 'BJOERN', captain: true, team: 1, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Eskil', surname: 'Skarin', nickname: 'skarre', captain: false, team: 1, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Rasmus', surname: 'Lager', nickname: 'Mousn', captain: false, team: 1, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Rickard', surname: 'Lundby', nickname: 'Phase', captain: false, team: 1, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Eric', surname: 'Wahlgren', nickname: 'Rasande Roland', captain: false, team: 1, kills: 0, assists: 0, deaths: 0, damage: 0 },

    { firstname: 'Carl', surname: 'Pagels', nickname: 'Cuuurl', captain: true, team: 2, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Håkan', surname: 'Fröderberg', nickname: 'Warken', captain: false, team: 2, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Pontus', surname: 'Johansson', nickname: 'shzss', captain: false, team: 2, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Gunnar', surname: 'Henson', nickname: 'Atlas', captain: false, team: 2, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Petter', surname: 'Wagander', nickname: 'Biggie cheese', captain: false, team: 2, kills: 0, assists: 0, deaths: 0, damage: 0 },

    { firstname: 'Lukas', surname: 'Karlsson', nickname: 'Krak3N', captain: true, team: 3, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Emil', surname: 'Carlsson', nickname: 'wRoNg', captain: false, team: 3, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Edvin', surname: 'Ström', nickname: 'Amp3d', captain: false, team: 3, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Tommy', surname: 'Karlsson', nickname: 'trivial_tom', captain: false, team: 3, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Gustav', surname: 'Larsson', nickname: 'Are those Reebok or Nike?', captain: false, team: 3, kills: 0, assists: 0, deaths: 0, damage: 0 },

    { firstname: 'Joakim', surname: 'Österberg', nickname: 'Units', captain: true, team: 4, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Ludvig', surname: 'Bengtsson', nickname: 'Lolkana', captain: false, team: 4, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Jon', surname: 'Jennemann', nickname: 'kr4nk', captain: false, team: 4, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Elliot', surname: 'Gustafsson', nickname: 'ottyhard', captain: false, team: 4, kills: 0, assists: 0, deaths: 0, damage: 0 },
    { firstname: 'Joakim', surname: 'Lodén', nickname: 'Daimon', captain: false, team: 4, kills: 0, assists: 0, deaths: 0, damage: 0 },
];

matches.forEach((match) => {
    match.games.forEach((game) => {
        if (game.stats === null) {
            return;
        }

        game.stats.forEach((stat) => {
            let participant = participants.find((p) => p.nickname === stat.name);

            if (participant) {
                participant.kills += stat.kills;
                participant.assists += stat.assists;
                participant.deaths += stat.deaths;
                participant.damage += stat.damage;
            }
        });
    });
});

export default participants;