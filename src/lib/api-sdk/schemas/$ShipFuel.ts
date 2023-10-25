/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipFuel = {
    description: `Details of the ship's fuel tanks including how much fuel was consumed during the last transit or action.`,
    properties: {
        current: {
            type: 'number',
            description: `The current amount of fuel in the ship's tanks.`,
            isRequired: true,
        },
        capacity: {
            type: 'number',
            description: `The maximum amount of fuel the ship's tanks can hold.`,
            isRequired: true,
        },
        consumed: {
            description: `An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.`,
            properties: {
                amount: {
                    type: 'number',
                    description: `The amount of fuel consumed by the most recent transit or action.`,
                    isRequired: true,
                },
                timestamp: {
                    type: 'string',
                    description: `The time at which the fuel was consumed.`,
                    isRequired: true,
                    format: 'date-time',
                },
            },
        },
    },
} as const;
