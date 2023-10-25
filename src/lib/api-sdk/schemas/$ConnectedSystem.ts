/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ConnectedSystem = {
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the system.`,
            isRequired: true,
            minLength: 1,
        },
        sectorSymbol: {
            type: 'string',
            description: `The sector of this system.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'SystemType',
            isRequired: true,
        },
        factionSymbol: {
            type: 'string',
            description: `The symbol of the faction that owns the connected jump gate in the system.`,
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
        distance: {
            type: 'number',
            description: `The distance of this system to the connected Jump Gate.`,
            isRequired: true,
        },
    },
} as const;
