/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipyardTransaction = {
    description: `Results of a transaction with a shipyard.`,
    properties: {
        waypointSymbol: {
            type: 'WaypointSymbol',
            isRequired: true,
        },
        shipSymbol: {
            type: 'string',
            description: `The symbol of the ship that was the subject of the transaction.`,
            isRequired: true,
        },
        shipType: {
            type: 'string',
            description: `The symbol of the ship that was the subject of the transaction.`,
            isRequired: true,
        },
        price: {
            type: 'number',
            description: `The price of the transaction.`,
            isRequired: true,
        },
        agentSymbol: {
            type: 'string',
            description: `The symbol of the agent that made the transaction.`,
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
