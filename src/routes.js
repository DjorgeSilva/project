// @flow

export type RouteDefinitionType = {
    path: string,
    name: string,
    label: string
}

const routes: Array<RouteDefinitionType> = [{
        path: '/error',
        name: 'error',
        label: 'Error'
    },
    {
        path: '/splash',
        name: 'splash',
        label: 'Splash'
    },
    {
        path: '/main',
        name: 'main',
        label: 'Main'
    },
]

export const getRouteByName = (name: string): RouteDefinitionType => {
    const result = routes.find(route => route.name === name)

    if (!result) {
        throw new Error(`Could not get route by name "${name}": does not exist!`)
    }

    return result
}

export default routes