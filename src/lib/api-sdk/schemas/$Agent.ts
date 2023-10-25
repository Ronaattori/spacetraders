/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Agent = {
    description: `Agent details.`,
    properties: {
        accountId: {
            type: 'string',
            description: `Account ID that is tied to this agent. Only included on your own agent.`,
            minLength: 1,
        },
        symbol: {
            type: 'string',
            description: `Symbol of the agent.`,
            isRequired: true,
            maxLength: 14,
            minLength: 3,
        },
        headquarters: {
            type: 'string',
            description: `The headquarters of the agent.`,
            isRequired: true,
            minLength: 1,
        },
        credits: {
            type: 'number',
            description: `The number of credits the agent has available. Credits can be negative if funds have been overdrawn.`,
            isRequired: true,
            format: 'int64',
        },
        startingFaction: {
            type: 'string',
            description: `The faction the agent started with.`,
            isRequired: true,
            minLength: 1,
        },
        shipCount: {
            type: 'number',
            description: `How many ships are owned by the agent.`,
        },
    },
} as const;
