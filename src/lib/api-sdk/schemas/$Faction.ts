/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Faction = {
    description: `Faction details.`,
    properties: {
        symbol: {
            type: 'FactionSymbol',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `Name of the faction.`,
            isRequired: true,
            minLength: 1,
        },
        description: {
            type: 'string',
            description: `Description of the faction.`,
            isRequired: true,
            minLength: 1,
        },
        headquarters: {
            type: 'string',
            description: `The waypoint in which the faction's HQ is located in.`,
            isRequired: true,
            minLength: 1,
        },
        traits: {
            type: 'array',
            contains: {
                type: 'FactionTrait',
            },
            isRequired: true,
        },
        isRecruiting: {
            type: 'boolean',
            description: `Whether or not the faction is currently recruiting new agents.`,
            isRequired: true,
        },
    },
} as const;
