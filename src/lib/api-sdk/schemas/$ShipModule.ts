/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipModule = {
    description: `A module can be installed in a ship and provides a set of capabilities such as storage space or quarters for crew. Module installations are permanent.`,
    properties: {
        symbol: {
            type: 'Enum',
            isRequired: true,
        },
        capacity: {
            type: 'number',
            description: `Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a bonus the module grants.`,
        },
        range: {
            type: 'number',
            description: `Modules that have a range will such as a sensor array show this value to denote how far can the module reach with its capabilities.`,
        },
        name: {
            type: 'string',
            description: `Name of this module.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `Description of this module.`,
            isRequired: true,
        },
        requirements: {
            type: 'ShipRequirements',
            isRequired: true,
        },
    },
} as const;
