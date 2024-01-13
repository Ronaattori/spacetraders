/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ExtractionYield = {
    description: `A yield from the extraction operation.`,
    properties: {
        symbol: {
            type: 'TradeSymbol',
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units extracted that were placed into the ship's cargo hold.`,
            isRequired: true,
        },
    },
} as const;
