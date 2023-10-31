/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TradeSymbol } from './TradeSymbol';

/**
 * Yields from the siphon operation.
 */
export type SiphonYield = {
    /**
     * Symbol of the good that was siphoned.
     */
    symbol: TradeSymbol;
    /**
     * The number of units siphoned that were placed into the ship's cargo hold.
     */
    units: number;
};

