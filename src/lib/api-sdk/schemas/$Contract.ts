/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Contract = {
    description: `Contract details.`,
    properties: {
        id: {
            type: 'string',
            description: `ID of the contract.`,
            isRequired: true,
            minLength: 1,
        },
        factionSymbol: {
            type: 'string',
            description: `The symbol of the faction that this contract is for.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        terms: {
            type: 'ContractTerms',
            description: `The terms to fulfill the contract.`,
            isRequired: true,
        },
        accepted: {
            type: 'boolean',
            description: `Whether the contract has been accepted by the agent`,
            isRequired: true,
        },
        fulfilled: {
            type: 'boolean',
            description: `Whether the contract has been fulfilled`,
            isRequired: true,
        },
        expiration: {
            type: 'string',
            description: `Deprecated in favor of deadlineToAccept`,
            isRequired: true,
            format: 'date-time',
        },
        deadlineToAccept: {
            type: 'string',
            description: `The time at which the contract is no longer available to be accepted`,
            format: 'date-time',
        },
    },
} as const;
