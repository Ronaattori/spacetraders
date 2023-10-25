/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Result of a transaction with a market.
 */
export type MarketTransaction = {
    /**
     * The symbol of the waypoint where the transaction took place.
     */
    waypointSymbol: string;
    /**
     * The symbol of the ship that made the transaction.
     */
    shipSymbol: string;
    /**
     * The symbol of the trade good.
     */
    tradeSymbol: string;
    /**
     * The type of transaction.
     */
    type: MarketTransaction.type;
    /**
     * The number of units of the transaction.
     */
    units: number;
    /**
     * The price per unit of the transaction.
     */
    pricePerUnit: number;
    /**
     * The total price of the transaction.
     */
    totalPrice: number;
    /**
     * The timestamp of the transaction.
     */
    timestamp: string;
};

export namespace MarketTransaction {

    /**
     * The type of transaction.
     */
    export enum type {
        PURCHASE = 'PURCHASE',
        SELL = 'SELL',
    }


}

