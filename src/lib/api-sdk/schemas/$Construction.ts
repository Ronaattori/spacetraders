/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Construction = {
    description: `The construction details of a waypoint.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the waypoint.`,
            isRequired: true,
        },
        materials: {
            type: 'array',
            contains: {
                type: 'ConstructionMaterial',
            },
            isRequired: true,
        },
        isComplete: {
            type: 'boolean',
            description: `Whether the waypoint has been constructed.`,
            isRequired: true,
        },
    },
} as const;
