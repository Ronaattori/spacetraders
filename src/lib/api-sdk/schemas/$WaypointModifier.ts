/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WaypointModifier = {
    properties: {
        symbol: {
            type: 'WaypointModifierSymbol',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `The name of the trait.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `A description of the trait.`,
            isRequired: true,
        },
    },
} as const;
