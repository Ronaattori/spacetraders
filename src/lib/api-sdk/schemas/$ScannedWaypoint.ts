/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScannedWaypoint = {
    description: `A waypoint that was scanned by a ship.`,
    properties: {
        symbol: {
            type: 'WaypointSymbol',
            isRequired: true,
        },
        type: {
            type: 'WaypointType',
            isRequired: true,
        },
        systemSymbol: {
            type: 'SystemSymbol',
            isRequired: true,
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
        orbitals: {
            type: 'array',
            contains: {
                type: 'WaypointOrbital',
            },
            isRequired: true,
        },
        faction: {
            type: 'WaypointFaction',
        },
        traits: {
            type: 'array',
            contains: {
                type: 'WaypointTrait',
            },
            isRequired: true,
        },
        chart: {
            type: 'Chart',
        },
    },
} as const;
