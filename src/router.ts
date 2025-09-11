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

    // Get the current path, removing any base path if present
    let currentPath = window.location.pathname
    
    // Handle GitHub Pages deployment path
    if (currentPath.startsWith('/fortnox-inhouse-tournament')) {
        currentPath = currentPath.replace('/fortnox-inhouse-tournament', '') || '/'
    }

    const route: Routes | undefined = routes.find(route => route.path === currentPath)

    if (!route) {
        // If no route matches, redirect to home
        const homeRoute = routes.find(route => route.path === '/')
        if (homeRoute) {
            root.style.opacity = "0.0"
            setTimeout(() => {
                root.innerHTML = homeRoute.data
                root.style.opacity = "1.0"
            }, 50)
        }
        return
    }

    const html: string = route.data
    root.style.opacity = "0.0"

    setTimeout(() => {
        root.innerHTML = html
        root.style.opacity = "1.0"
    }, 50)
}

const setNavLinkColor = () => {
    document.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
        // Extract the path from the link href
        const linkUrl = new URL(link.href)
        let linkPath = linkUrl.pathname
        
        // Handle GitHub Pages deployment path
        if (linkPath.startsWith('/fortnox-inhouse-tournament')) {
            linkPath = linkPath.replace('/fortnox-inhouse-tournament', '') || '/'
        }
        
        let currentPath = window.location.pathname
        if (currentPath.startsWith('/fortnox-inhouse-tournament')) {
            currentPath = currentPath.replace('/fortnox-inhouse-tournament', '') || '/'
        }
        
        if (linkPath === currentPath) {
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
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        setRouteHtml()
        setNavLinkColor()
    })

    // Handle initial page load and DOM updates
    const initializeRouter = () => {
        // Set up click handlers for navigation links
        const navLinks = document.querySelectorAll<HTMLAnchorElement>('nav a')
        navLinks.forEach(link => {
            link.removeEventListener('click', router) // Remove any existing listeners
            link.addEventListener('click', router)
        })

        // Handle the current route
        setRouteHtml()
        setNavLinkColor()
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRouter)
    } else {
        // DOM is already ready, but we might need to wait for the nav to be rendered
        setTimeout(initializeRouter, 0)
    }

    // Also set up a mutation observer to catch when nav is added dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element
                        if (element.querySelector && element.querySelector('nav')) {
                            initializeRouter()
                        }
                    }
                })
            }
        })
    })

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

setEventListeners()
