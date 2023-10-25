/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MarketTradeGood = {
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the trade good.`,
            isRequired: true,
        },
        tradeVolume: {
            type: 'number',
            description: `The typical volume flowing through the market for this type of good. The larger the trade volume, the more stable prices will be.`,
            isRequired: true,
            minimum: 1,
        },
        supply: {
            type: 'Enum',
            isRequired: true,
        },
        purchasePrice: {
            type: 'number',
            description: `The price at which this good can be purchased from the market.`,
            isRequired: true,
        },
        sellPrice: {
            type: 'number',
            description: `The price at which this good can be sold to the market.`,
            isRequired: true,
        },
    },
} as const;
