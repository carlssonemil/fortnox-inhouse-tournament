import participants from '../collections/participants'
import type Participant from "../models/Participant.ts";

const participantList: string[] = participants.map((participant: Participant, index: number) => {
    ++index;

    return `<tr><td class="border p-4 text-left">${index}. ${participant.firstname} <strong>${participant.nickname}</strong> ${participant.surname}</td></tr>`
})

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Deltagare</h1>
  
  <table class="w-full border-collapse border">
    <tbody>
        ${participantList.join('')}
    </tbody>
  </table>
`