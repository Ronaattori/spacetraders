/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipNav = {
    description: `The navigation information of the ship.`,
    properties: {
        systemSymbol: {
            type: 'SystemSymbol',
            isRequired: true,
        },
        waypointSymbol: {
            type: 'WaypointSymbol',
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
