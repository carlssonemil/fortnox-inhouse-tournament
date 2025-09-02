import type Participant from './Participant';

export default interface Team {
    team: number;
    name: string;
    members: Participant[]
}