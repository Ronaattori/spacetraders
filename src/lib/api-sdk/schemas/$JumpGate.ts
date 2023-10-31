/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $JumpGate = {
    properties: {
        connections: {
            type: 'array',
            contains: {
                type: 'string',
                description: `The symbol of the waypoint that has a corresponding gate.`,
            },
            isRequired: true,
        },
    },
} as const;
