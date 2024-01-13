/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SiphonYield = {
    description: `A yield from the siphon operation.`,
    properties: {
        symbol: {
            type: 'TradeSymbol',
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units siphoned that were placed into the ship's cargo hold.`,
            isRequired: true,
        },
    },
} as const;
