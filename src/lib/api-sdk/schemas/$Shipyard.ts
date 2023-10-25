/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Shipyard = {
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located.`,
            isRequired: true,
            minLength: 1,
        },
        shipTypes: {
            type: 'array',
            contains: {
                properties: {
                    type: {
                        type: 'ShipType',
                    },
                },
            },
            isRequired: true,
        },
        transactions: {
            type: 'array',
            contains: {
                type: 'ShipyardTransaction',
            },
        },
        ships: {
            type: 'array',
            contains: {
                type: 'ShipyardShip',
            },
        },
        modificationsFee: {
            type: 'number',
            description: `The fee to modify a ship at this shipyard. This includes installing or removing modules and mounts on a ship. In the case of mounts, the fee is a flat rate per mount. In the case of modules, the fee is per slot the module occupies.`,
            isRequired: true,
        },
    },
} as const;
