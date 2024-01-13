/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipyardShip = {
    properties: {
        type: {
            type: 'ShipType',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        supply: {
            type: 'SupplyLevel',
            isRequired: true,
        },
        activity: {
            type: 'ActivityLevel',
        },
        purchasePrice: {
            type: 'number',
            isRequired: true,
        },
        frame: {
            type: 'ShipFrame',
            isRequired: true,
        },
        reactor: {
            type: 'ShipReactor',
            isRequired: true,
        },
        engine: {
            type: 'ShipEngine',
            isRequired: true,
        },
        modules: {
            type: 'array',
            contains: {
                type: 'ShipModule',
            },
            isRequired: true,
        },
        mounts: {
            type: 'array',
            contains: {
                type: 'ShipMount',
            },
            isRequired: true,
        },
        crew: {
            properties: {
                required: {
                    type: 'number',
                    isRequired: true,
                },
                capacity: {
                    type: 'number',
                    isRequired: true,
                },
            },
            isRequired: true,
        },
    },
} as const;
