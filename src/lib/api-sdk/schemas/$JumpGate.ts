/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $JumpGate = {
    properties: {
        jumpRange: {
            type: 'number',
            description: `The maximum jump range of the gate.`,
            isRequired: true,
        },
        factionSymbol: {
            type: 'string',
            description: `The symbol of the faction that owns the gate.`,
        },
        connectedSystems: {
            type: 'array',
            contains: {
                type: 'ConnectedSystem',
            },
            isRequired: true,
        },
    },
} as const;
