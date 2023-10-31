/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ConstructionMaterial = {
    description: `The details of the required construction materials for a given waypoint under construction.`,
    properties: {
        tradeSymbol: {
            type: 'TradeSymbol',
            isRequired: true,
        },
        required: {
            type: 'number',
            description: `The number of units required.`,
            isRequired: true,
        },
        fulfilled: {
            type: 'number',
            description: `The number of units fulfilled toward the required amount.`,
            isRequired: true,
        },
    },
} as const;
