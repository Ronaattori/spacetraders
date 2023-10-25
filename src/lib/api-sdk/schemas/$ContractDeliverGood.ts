/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ContractDeliverGood = {
    description: `The details of a delivery contract. Includes the type of good, units needed, and the destination.`,
    properties: {
        tradeSymbol: {
            type: 'string',
            description: `The symbol of the trade good to deliver.`,
            isRequired: true,
            minLength: 1,
        },
        destinationSymbol: {
            type: 'string',
            description: `The destination where goods need to be delivered.`,
            isRequired: true,
            minLength: 1,
        },
        unitsRequired: {
            type: 'number',
            description: `The number of units that need to be delivered on this contract.`,
            isRequired: true,
        },
        unitsFulfilled: {
            type: 'number',
            description: `The number of units fulfilled on this contract.`,
            isRequired: true,
        },
    },
} as const;
