/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Siphon = {
    description: `Siphon details.`,
    properties: {
        shipSymbol: {
            type: 'string',
            description: `Symbol of the ship that executed the siphon.`,
            isRequired: true,
            minLength: 1,
        },
        yield: {
            type: 'SiphonYield',
            description: `Yields from the siphon operation.`,
            isRequired: true,
        },
    },
} as const;
