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
        type: {
            type: 'Enum',
            isRequired: true,
        },
        tradeVolume: {
            type: 'number',
            description: `This is the maximum number of units that can be purchased or sold at this market in a single trade for this good. Trade volume also gives an indication of price volatility. A market with a low trade volume will have large price swings, while high trade volume will be more resilient to price changes.`,
            isRequired: true,
            minimum: 1,
        },
        supply: {
            type: 'SupplyLevel',
            isRequired: true,
        },
        activity: {
            type: 'ActivityLevel',
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
