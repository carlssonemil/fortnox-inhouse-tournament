import './router'

import nav from './components/nav';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${nav}
    <div id="root" class="flex-1 w-full p-8"></div>
`
