/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ContractTerms = {
    description: `The terms to fulfill the contract.`,
    properties: {
        deadline: {
            type: 'string',
            description: `The deadline for the contract.`,
            isRequired: true,
            format: 'date-time',
        },
        payment: {
            type: 'ContractPayment',
            description: `Payments for the contract.`,
            isRequired: true,
        },
        deliver: {
            type: 'array',
            contains: {
                type: 'ContractDeliverGood',
            },
        },
    },
} as const;
