/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WaypointModifier = {
    /**
     * The unique identifier of the modifier.
     */
    symbol: WaypointModifier.symbol;
    /**
     * The name of the trait.
     */
    name: string;
    /**
     * A description of the trait.
     */
    description: string;
};

export namespace WaypointModifier {

    /**
     * The unique identifier of the modifier.
     */
    export enum symbol {
        STRIPPED = 'STRIPPED',
        UNSTABLE = 'UNSTABLE',
        RADIATION_LEAK = 'RADIATION_LEAK',
        CRITICAL_LIMIT = 'CRITICAL_LIMIT',
        CIVIL_UNREST = 'CIVIL_UNREST',
    }


}

