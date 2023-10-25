/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipCargo = {
    description: `Ship cargo details.`,
    properties: {
        capacity: {
            type: 'number',
            description: `The max number of items that can be stored in the cargo hold.`,
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of items currently stored in the cargo hold.`,
            isRequired: true,
        },
        inventory: {
            type: 'array',
            contains: {
                type: 'ShipCargoItem',
            },
            isRequired: true,
        },
    },
} as const;
