/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ContractPayment = {
    description: `Payments for the contract.`,
    properties: {
        onAccepted: {
            type: 'number',
            description: `The amount of credits received up front for accepting the contract.`,
            isRequired: true,
        },
        onFulfilled: {
            type: 'number',
            description: `The amount of credits received when the contract is fulfilled.`,
            isRequired: true,
        },
    },
} as const;
