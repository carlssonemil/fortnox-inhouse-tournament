/*export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Lag</h1>
  
  <h2 class="font-bold sm:truncate sm:tracking-tight pb-3">Uppdateras så fort lagen är lottade.</h2>
`*/

import { getTeams } from '../helpers/getTeams';

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Lag</h1>
  
  <div class="md:grid md:grid-flow-col md:grid-cols-4 md:items-start">
    ${getTeams()}
  </div>
`