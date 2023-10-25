/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MarketTradeGood = {
    /**
     * The symbol of the trade good.
     */
    symbol: string;
    /**
     * The typical volume flowing through the market for this type of good. The larger the trade volume, the more stable prices will be.
     */
    tradeVolume: number;
    /**
     * A rough estimate of the total supply of this good in the marketplace.
     */
    supply: MarketTradeGood.supply;
    /**
     * The price at which this good can be purchased from the market.
     */
    purchasePrice: number;
    /**
     * The price at which this good can be sold to the market.
     */
    sellPrice: number;
};

export namespace MarketTradeGood {

    /**
     * A rough estimate of the total supply of this good in the marketplace.
     */
    export enum supply {
        SCARCE = 'SCARCE',
        LIMITED = 'LIMITED',
        MODERATE = 'MODERATE',
        ABUNDANT = 'ABUNDANT',
    }


}

