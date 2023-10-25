/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $System = {
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the system.`,
            isRequired: true,
            minLength: 1,
        },
        sectorSymbol: {
            type: 'string',
            description: `The symbol of the sector.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'SystemType',
            isRequired: true,
        },
        'x': {
            type: 'number',
            description: `Relative position of the system in the sector in the x axis.`,
            isRequired: true,
        },
        'y': {
            type: 'number',
            description: `Relative position of the system in the sector in the y axis.`,
            isRequired: true,
        },
        waypoints: {
            type: 'array',
            contains: {
                type: 'SystemWaypoint',
            },
            isRequired: true,
        },
        factions: {
            type: 'array',
            contains: {
                type: 'SystemFaction',
            },
            isRequired: true,
        },
    },
} as const;
