import type Routes from './models/Routes'

import HomeView from './views/Home'
import GroupsView from './views/Groups'
import PlayoffsView from './views/Playoffs'
import ParticipantsView from './views/Participants'
import TeamsView from './views/Teams'
import StatsView from './views/Stats'
import RulesView from './views/Rules'

const routes: Routes[] = [
    {
        path: '/',
        data: HomeView
    },
    {
        path: '/groups',
        data: GroupsView
    },
    {
        path: '/playoffs',
        data: PlayoffsView
    },
    {
        path: '/participants',
        data: ParticipantsView
    },
    {
        path: '/teams',
        data: TeamsView
    },
    {
        path: '/stats',
        data: StatsView
    },
    {
        path: '/rules',
        data: RulesView
    },
]

const setRouteHtml = () => {
    const root: HTMLElement | null = document.getElementById('root')

    if (!root)
        return

    const route: Routes | undefined = routes.find(route => route.path == window.location.pathname || '/fortnox-inhouse-tournament' + route.path == window.location.pathname)

    if (!route)
        return

    const html: string = route.data
    root.style.opacity = "0.0"

    setTimeout(() => {
        root.innerHTML = html
        root.style.opacity = "1.0"
    }, 50)
}

const setNavLinkColor = () => {
    document.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('bg-emerald-950')
            link.classList.remove('bg-transparent')
        } else {
            link.classList.remove('bg-emerald-950')
            link.classList.add('bg-transparent')
        }
    })
}

const router = (mouseEvent: MouseEvent) => {
    if (!mouseEvent)
        return

    mouseEvent.preventDefault()

    const target = (mouseEvent.target) as HTMLAnchorElement

    if (!target)
        return

    history.pushState({}, 'newUrl', target.href)
    setRouteHtml()
    setNavLinkColor()
}

const setEventListeners = () => {
    window.addEventListener('popstate', setRouteHtml)

    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
            link.addEventListener('click', router)
        })

        setRouteHtml()
        setNavLinkColor()
    })
}

setEventListeners()