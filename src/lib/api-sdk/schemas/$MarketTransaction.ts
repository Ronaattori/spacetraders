/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MarketTransaction = {
    description: `Result of a transaction with a market.`,
    properties: {
        waypointSymbol: {
            type: 'string',
            description: `The symbol of the waypoint where the transaction took place.`,
            isRequired: true,
        },
        shipSymbol: {
            type: 'string',
            description: `The symbol of the ship that made the transaction.`,
            isRequired: true,
        },
        tradeSymbol: {
            type: 'string',
            description: `The symbol of the trade good.`,
            isRequired: true,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        units: {
            type: 'number',
            description: `The number of units of the transaction.`,
            isRequired: true,
        },
        pricePerUnit: {
            type: 'number',
            description: `The price per unit of the transaction.`,
            isRequired: true,
        },
        totalPrice: {
            type: 'number',
            description: `The total price of the transaction.`,
            isRequired: true,
        },
        timestamp: {
            type: 'string',
            description: `The timestamp of the transaction.`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
