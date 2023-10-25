/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TradeSymbol } from './TradeSymbol';

/**
 * Yields from the extract operation.
 */
export type ExtractionYield = {
    /**
     * Symbol of the good that was extracted.
     */
    symbol: TradeSymbol;
    /**
     * The number of units extracted that were placed into the ship's cargo hold.
     */
    units: number;
};

