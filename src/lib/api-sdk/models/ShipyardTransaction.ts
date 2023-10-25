/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Results of a transaction with a shipyard.
 */
export type ShipyardTransaction = {
    /**
     * The symbol of the waypoint where the transaction took place.
     */
    waypointSymbol: string;
    /**
     * The symbol of the ship that was the subject of the transaction.
     */
    shipSymbol: string;
    /**
     * The price of the transaction.
     */
    price: number;
    /**
     * The symbol of the agent that made the transaction.
     */
    agentSymbol: string;
    /**
     * The timestamp of the transaction.
     */
    timestamp: string;
};

