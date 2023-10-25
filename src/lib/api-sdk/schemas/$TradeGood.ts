/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TradeGood = {
    description: `A good that can be traded for other goods or currency.`,
    properties: {
        symbol: {
            type: 'TradeSymbol',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `The name of the good.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `The description of the good.`,
            isRequired: true,
        },
    },
} as const;
