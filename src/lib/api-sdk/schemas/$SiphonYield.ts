/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SiphonYield = {
    description: `Yields from the siphon operation.`,
    properties: {
        symbol: {
            type: 'TradeSymbol',
            description: `Symbol of the good that was siphoned.`,
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units siphoned that were placed into the ship's cargo hold.`,
            isRequired: true,
        },
    },
} as const;
