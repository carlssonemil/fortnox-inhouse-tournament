import type Participant from "../models/Participant.ts";

let participants: Participant[] = [
    { firstname: 'Patrik', surname: 'Björn', nickname: 'BJOERN' },
    { firstname: 'Lena', surname: 'Kowalski', nickname: 'LENSKY' },
    { firstname: 'Hiroshi', surname: 'Takahashi', nickname: 'HIRO' },
    { firstname: 'Amira', surname: 'Nasri', nickname: 'MIRA' },
    { firstname: 'Carlos', surname: 'Domínguez', nickname: 'CARLITO' },
    { firstname: 'Freya', surname: 'Andersen', nickname: 'FREY' },
    { firstname: 'Zane', surname: 'Keller', nickname: 'ZAK' },
    { firstname: 'Nina', surname: 'Volkova', nickname: 'VOLKA' },
    { firstname: 'Tariq', surname: 'Hassan', nickname: 'TQ' },
    { firstname: 'Sophie', surname: 'Dubois', nickname: 'SOPH' },
    { firstname: 'Mateo', surname: 'Rossi', nickname: 'TEO' },
    { firstname: 'Ines', surname: 'Müller', nickname: 'NES' },
    { firstname: 'David', surname: 'Nguyen', nickname: 'DAVE' },
    { firstname: 'Luca', surname: 'Petrovic', nickname: 'LUCKY' },
    { firstname: 'Ayla', surname: 'Demir', nickname: 'AY' },
    { firstname: 'Jonas', surname: 'Lindholm', nickname: 'JONNY' },
    { firstname: 'Fatima', surname: 'Al-Mansoori', nickname: 'FATZ' },
    { firstname: 'Noah', surname: 'Zimmer', nickname: 'ZIM' },
    { firstname: 'Chiara', surname: 'Bianchi', nickname: 'CHI' },
    { firstname: 'Elias', surname: 'Gruber', nickname: 'ELI' },
    { firstname: 'Rania', surname: 'Fahmy', nickname: 'RAN' },
    { firstname: 'Marcus', surname: 'Stewart', nickname: 'MARCY' },
    { firstname: 'Tanya', surname: 'Ilyin', nickname: 'TAN' },
    { firstname: 'Leo', surname: 'Carvalho', nickname: 'LION' },
    { firstname: 'Mila', surname: 'Horvat', nickname: 'MIMI' },
    { firstname: 'Jasper', surname: 'Schultz', nickname: 'JAZZ' },
    { firstname: 'Lena', surname: 'Kowalski', nickname: 'LENSKY' },
    { firstname: 'Hiroshi', surname: 'Takahashi', nickname: 'HIRO' },
    { firstname: 'Amira', surname: 'Nasri', nickname: 'MIRA' },
    { firstname: 'Carlos', surname: 'Domínguez', nickname: 'CARLITO' },
    { firstname: 'Freya', surname: 'Andersen', nickname: 'FREY' },
    { firstname: 'Zane', surname: 'Keller', nickname: 'ZAK' },
    { firstname: 'Nina', surname: 'Volkova', nickname: 'VOLKA' },
    { firstname: 'Tariq', surname: 'Hassan', nickname: 'TQ' },
    { firstname: 'Sophie', surname: 'Dubois', nickname: 'SOPH' },
    { firstname: 'Mateo', surname: 'Rossi', nickname: 'TEO' },
    { firstname: 'Ines', surname: 'Müller', nickname: 'NES' },
    { firstname: 'David', surname: 'Nguyen', nickname: 'DAVE' },
    { firstname: 'Luca', surname: 'Petrovic', nickname: 'LUCKY' },
    { firstname: 'Ayla', surname: 'Demir', nickname: 'AY' },
];

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