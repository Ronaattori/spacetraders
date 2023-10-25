/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipMount = {
    description: `A mount is installed on the exterier of a ship.`,
    properties: {
        symbol: {
            type: 'Enum',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `Name of this mount.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `Description of this mount.`,
        },
        strength: {
            type: 'number',
            description: `Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are.`,
        },
        deposits: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
        },
        requirements: {
            type: 'ShipRequirements',
            isRequired: true,
        },
    },
} as const;
