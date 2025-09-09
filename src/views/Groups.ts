/*export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Gruppspel</h1>

  <h2 class="font-bold sm:truncate sm:tracking-tight pb-3">Uppdateras så fort lagen är klara.</h2>
`*/

import { getGroupStandings } from '../helpers/getGroupStandings';
import { getGroupMatches } from '../helpers/getGroupMatches';
import matches from '../collections/matches';

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Gruppspel</h1>
  
  <div class="md:grid md:grid-flow-col md:grid-cols-1 md:items-start">
    <div class="md:grid md:grid-flow-row md:mr-2">
      <table class="w-full border-collapse border">
        <thead>
            <tr>
                <th></th>
                <th class="p-4 text-left hidden md:table-cell">M</th>
                <th class="p-4 text-left">W</th>
                <th class="p-4 text-left">L</th>
                <th class="p-4 text-left">RD</th>
                <th class="p-4 text-left">P</th>
            </tr>
        </thead>
        <tbody>
            ${getGroupStandings(1, matches)}
        </tbody>
      </table>
      
      <div class="pt-12">
        ${getGroupMatches(1, matches)}
      </div>
    </div>
  </div>
`