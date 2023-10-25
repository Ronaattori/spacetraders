/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipNav = {
    description: `The navigation information of the ship.`,
    properties: {
        systemSymbol: {
            type: 'string',
            description: `The system symbol of the ship's current location.`,
            isRequired: true,
        },
        waypointSymbol: {
            type: 'string',
            description: `The waypoint symbol of the ship's current location, or if the ship is in-transit, the waypoint symbol of the ship's destination.`,
            isRequired: true,
        },
        route: {
            type: 'ShipNavRoute',
            isRequired: true,
        },
        status: {
            type: 'ShipNavStatus',
            isRequired: true,
        },
        flightMode: {
            type: 'ShipNavFlightMode',
            isRequired: true,
        },
    },
} as const;
