import './router'

import nav from './components/nav';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${nav}
    <div id="root" class="md:flex-1 md:w-full p-8"></div>
`
