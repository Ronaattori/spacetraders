/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipNavRouteWaypoint = {
    description: `The destination or departure of a ships nav route.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the waypoint.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'WaypointType',
            isRequired: true,
        },
        systemSymbol: {
            type: 'string',
            description: `The symbol of the system the waypoint is in.`,
            isRequired: true,
            minLength: 1,
        },
        'x': {
            type: 'number',
            description: `Position in the universe in the x axis.`,
            isRequired: true,
        },
        'y': {
            type: 'number',
            description: `Position in the universe in the y axis.`,
            isRequired: true,
        },
    },
} as const;
