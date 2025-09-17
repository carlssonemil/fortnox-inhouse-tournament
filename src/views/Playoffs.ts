// import { getTeam } from '../helpers/getTeam';
// import { mapModal } from '../helpers/mapModal';
// import { MAP } from '../constants';

const crownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>`
// const chartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16v5"></path><path d="M16 14v7"></path><path d="M20 10v11"></path><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"></path><path d="M4 18v3"></path><path d="M8 14v7"></path></svg>`;

export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Slutspel</h1>
  
  <div class="md:grid md:grid-flow-col md:grid-cols-2 items-center">
    <div class="md:grid md:grid-flow-row md:grid-rows-1 md:mr-8">
      <div class="rounded-lg p-4 md:p-12 text-xs md:text-base z-10 bg-white shadow">
        <div class="grid grid-flow-col grid-cols-2">
          <h2 class="font-bold md:text-2xl sm:tracking-tight">team_BJOERN</h2>
          <h2 class="font-bold text-right md:text-2xl sm:tracking-tight">0</h2>
        </div>
      </div>
      <div class="rounded-lg p-4 md:p-12 text-xs -mt-2 z-0 md:text-base mx-8 playoffs">
        <div class="grid grid-flow-col grid-cols-4 mb-2 px-4 py-2">
          <h2 class="font-bold sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight ml-1">-</h2>
        </div>
        <div class="grid grid-flow-col grid-cols-4 mb-2 rounded-lg bg-white px-4 py-2 playoffs">
          <h2 class="font-bold sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight ml-1">-</h2>
        </div>
        <div class="grid grid-flow-col grid-cols-4 px-4 py-2 playoffs">
          <h2 class="font-bold sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight">-</h2>
          <h2 class="font-bold text-right sm:tracking-tight opacity-50 ml-1">-</h2>
        </div>
      </div>
      <div class="rounded-lg p-4 md:p-12 text-xs -mt-2 z-10 md:text-base bg-white shadow">
        <div class="grid grid-flow-col grid-cols-2">
          <h2 class="font-bold md:text-2xl sm:tracking-tight">team_Units</h2>
          <h2 class="font-bold text-right md:text-2xl sm:tracking-tight">0</h2>
        </div>
      </div>
    </div>
    
    <div class="md:grid md:grid-flow-row md:grid-rows-1 mt-8 md:mt-0 rounded-lg shadow">
      <div class="rounded-lg p-12 text-xs md:text-base bg-amber-400 z-1">
        <div class="grid grid-flow-col winner">
          ${crownIcon}
          <h2 class="font-bold text-3xl sm:tracking-tight z-50">TBD</h2>
        </div>
      </div>
  </div>
 `

/*export default `
  <h1 class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight pb-8">Slutspel</h1>
  
  <div class="grid grid-flow-col grid-cols-2 items-center">
    <div class="grid grid-flow-row grid-rows-1 mr-8">
      <div class="rounded-lg p-4 md:p-12 text-xs md:text-base z-10 bg-white shadow">
        <div class="grid grid-flow-col grid-cols-2">
          <h2 class="font-bold md:text-2xl sm:tracking-tight">team_BJOERN</h2>
          <h2 class="font-bold text-right md:text-2xl sm:tracking-tight">2</h2>
        </div>
      </div>
      <div class="rounded-lg p-4 md:p-12 text-xs -mt-2 z-0 md:text-base mx-8 playoffs">
        <div class="grid grid-flow-col grid-cols-4 mb-2 px-4 py-2">
          <h2 class="font-bold sm:tracking-tight">DUST2</h2>
          <h2 class="font-bold text-right sm:tracking-tight">13</h2>
          <h2 class="font-bold text-right sm:tracking-tight opacity-50 ml-1">8</h2>
          <button class="font-bold text-sm rounded-lg uppercase hover:cursor-pointer hover:text-amber-400 focus:outline-0" command="show-modal" commandfor="stats-modal-final-map1">Stats ${chartIcon}</button>
        </div>
        <div class="grid grid-flow-col grid-cols-4 mb-2 rounded-lg bg-white px-4 py-2 playoffs">
          <h2 class="font-bold sm:tracking-tight">MIRAGE</h2>
          <h2 class="font-bold text-right sm:tracking-tight opacity-50">11</h2>
          <h2 class="font-bold text-right sm:tracking-tight ml-1">13</h2>
          <button class="font-bold text-sm rounded-lg uppercase hover:cursor-pointer hover:text-amber-400 focus:outline-0" command="show-modal" commandfor="stats-modal-final-map2">Stats ${chartIcon}</button>
        </div>
        <div class="grid grid-flow-col grid-cols-4 px-4 py-2 playoffs">
          <h2 class="font-bold sm:tracking-tight">ANCIENT</h2>
          <h2 class="font-bold text-right sm:tracking-tight">16</h2>
          <h2 class="font-bold text-right sm:tracking-tight opacity-50 ml-1">14</h2>
          <button class="font-bold text-sm rounded-lg uppercase hover:cursor-pointer hover:text-amber-400 focus:outline-0" command="show-modal" commandfor="stats-modal-final-map3">Stats ${chartIcon}</button>
        </div>
      </div>
      <div class="rounded-lg p-4 md:p-12 text-xs -mt-2 z-10 md:text-base bg-white shadow">
        <div class="grid grid-flow-col grid-cols-2">
          <h2 class="font-bold md:text-2xl sm:tracking-tight opacity-50">team_Units</h2>
          <h2 class="font-bold text-right md:text-2xl sm:tracking-tight opacity-50">1</h2>
        </div>
      </div>
    </div>
    
    <div class="grid grid-flow-row grid-rows-1 rounded-lg shadow">
      <div class="rounded-tl-lg rounded-tr-lg p-4 md:p-12 text-xs md:text-base bg-amber-400 z-1">
        <div class="grid grid-flow-col winner">
          ${crownIcon}
          <h2 class="font-bold md:text-3xl sm:tracking-tight">team_BJOERN</h2>
        </div>
      </div>
      
      <div class="rounded-lg p-4 md:p-4 text-xs md:text-base bg-white -mt-1 z-0">
        <table class="w-full">
            <tbody>
                ${getTeam(1)?.members
                .slice()
                .map((member, index: number) => {
                    return `<tr>
                        <td class="${index === 0 ? '' : 'border-t border-black/30'} p-4 text-left">${member.firstname} <strong>${member.nickname}</strong> ${member.surname}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
      </div>
      ${mapModal(4, 1, MAP.ANCIENT, 'final-map1')}
      ${mapModal(4, 1, MAP.ANCIENT, 'final-map2')}
      ${mapModal(4, 1, MAP.ANCIENT, 'final-map3')}
  </div>
`*/