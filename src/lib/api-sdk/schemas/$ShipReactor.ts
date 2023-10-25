/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipReactor = {
    description: `The reactor of the ship. The reactor is responsible for powering the ship's systems and weapons.`,
    properties: {
        symbol: {
            type: 'Enum',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `Name of the reactor.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `Description of the reactor.`,
            isRequired: true,
        },
        condition: {
            type: 'ShipCondition',
        },
        powerOutput: {
            type: 'number',
            description: `The amount of power provided by this reactor. The more power a reactor provides to the ship, the lower the cooldown it gets when using a module or mount that taxes the ship's power.`,
            isRequired: true,
            minimum: 1,
        },
        requirements: {
            type: 'ShipRequirements',
            isRequired: true,
        },
    },
} as const;
