/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Market = {
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the market. The symbol is the same as the waypoint where the market is located.`,
            isRequired: true,
        },
        exports: {
            type: 'array',
            contains: {
                type: 'TradeGood',
            },
            isRequired: true,
        },
        imports: {
            type: 'array',
            contains: {
                type: 'TradeGood',
            },
            isRequired: true,
        },
        exchange: {
            type: 'array',
            contains: {
                type: 'TradeGood',
            },
            isRequired: true,
        },
        transactions: {
            type: 'array',
            contains: {
                type: 'MarketTransaction',
            },
        },
        tradeGoods: {
            type: 'array',
            contains: {
                type: 'MarketTradeGood',
            },
        },
    },
} as const;
