/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipCargoItem = {
    description: `The type of cargo item and the number of units.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The unique identifier of the cargo item type.`,
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `The name of the cargo item type.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `The description of the cargo item type.`,
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units of the cargo item.`,
            isRequired: true,
            minimum: 1,
        },
    },
} as const;
