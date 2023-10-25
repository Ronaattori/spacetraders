/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Cooldown = {
    description: `A cooldown is a period of time in which a ship cannot perform certain actions.`,
    properties: {
        shipSymbol: {
            type: 'string',
            description: `The symbol of the ship that is on cooldown`,
            isRequired: true,
            minLength: 1,
        },
        totalSeconds: {
            type: 'number',
            description: `The total duration of the cooldown in seconds`,
            isRequired: true,
        },
        remainingSeconds: {
            type: 'number',
            description: `The remaining duration of the cooldown in seconds`,
            isRequired: true,
        },
        expiration: {
            type: 'string',
            description: `The date and time when the cooldown expires in ISO 8601 format`,
            format: 'date-time',
        },
    },
} as const;
