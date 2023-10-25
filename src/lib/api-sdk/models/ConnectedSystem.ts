/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SystemType } from './SystemType';

export type ConnectedSystem = {
    /**
     * The symbol of the system.
     */
    symbol: string;
    /**
     * The sector of this system.
     */
    sectorSymbol: string;
    type: SystemType;
    /**
     * The symbol of the faction that owns the connected jump gate in the system.
     */
    factionSymbol?: string;
    /**
     * Position in the universe in the x axis.
     */
    'x': number;
    /**
     * Position in the universe in the y axis.
     */
    'y': number;
    /**
     * The distance of this system to the connected Jump Gate.
     */
    distance: number;
};

