import participants from '../collections/participants';

export function getFullname(nickname: string) {
    let participant = participants.filter(p => p.nickname === nickname)[0];

    return participant ? participant.firstname + ' <strong>' + participant.nickname + '</strong> ' + participant.surname : nickname;
}