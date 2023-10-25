/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScannedSystem = {
    description: `Details of a system was that scanned.`,
    properties: {
        symbol: {
            type: 'string',
            description: `Symbol of the system.`,
            isRequired: true,
            minLength: 1,
        },
        sectorSymbol: {
            type: 'string',
            description: `Symbol of the system's sector.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'SystemType',
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
        distance: {
            type: 'number',
            description: `The system's distance from the scanning ship.`,
            isRequired: true,
        },
    },
} as const;
