/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ExtractionYield = {
    description: `Yields from the extract operation.`,
    properties: {
        symbol: {
            type: 'TradeSymbol',
            description: `Symbol of the good that was extracted.`,
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units extracted that were placed into the ship's cargo hold.`,
            isRequired: true,
        },
    },
} as const;
