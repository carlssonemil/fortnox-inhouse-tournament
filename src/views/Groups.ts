export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Gruppspel</h1>
  
  <h2 class="font-bold sm:truncate sm:tracking-tight pb-3">Uppdateras så fort lagen är klara.</h2>
`

/*import { getGroupStandings } from '../helpers/getGroupStandings';
import matches from '../collections/matches';
import  {getGroupMatches } from '../helpers/getGroupMatches';

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Gruppspel</h1>
  
  <div class="grid grid-flow-col grid-cols-2 items-start">
    <div class="grid grid-flow-row mr-2">
      <table class="w-full border-collapse border">
        <caption class="caption-top">
            Grupp A
        </caption>
        <thead>
            <tr>
                <th></th>
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
    
    <div class="grid grid-flow-row ml-2">
      <table class="w-full border-collapse border">
        <caption class="caption-top">
            Grupp B
        </caption>
        <thead>
            <tr>
                <th></th>
                <th class="p-4 text-left">W</th>
                <th class="p-4 text-left">L</th>
                <th class="p-4 text-left">RD</th>
                <th class="p-4 text-left">P</th>
            </tr>
        </thead>
        <tbody>
            ${getGroupStandings(2, matches)}
        </tbody>
      </table>
      
      <div class="pt-12">
        ${getGroupMatches(2, matches)}
      </div>
    </div>
  </div>
`*/