/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Ship = {
    description: `Ship details.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The globally unique identifier of the ship in the following format: \`[AGENT_SYMBOL]-[HEX_ID]\``,
            isRequired: true,
        },
        registration: {
            type: 'ShipRegistration',
            isRequired: true,
        },
        nav: {
            type: 'ShipNav',
            isRequired: true,
        },
        crew: {
            type: 'ShipCrew',
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
        cooldown: {
            type: 'Cooldown',
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
        cargo: {
            type: 'ShipCargo',
            isRequired: true,
        },
        fuel: {
            type: 'ShipFuel',
            isRequired: true,
        },
    },
} as const;
