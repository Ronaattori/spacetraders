/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipRegistration = {
    description: `The public registration information of the ship`,
    properties: {
        name: {
            type: 'string',
            description: `The agent's registered name of the ship`,
            isRequired: true,
            minLength: 1,
        },
        factionSymbol: {
            type: 'string',
            description: `The symbol of the faction the ship is registered with`,
            isRequired: true,
            minLength: 1,
        },
        role: {
            type: 'ShipRole',
            isRequired: true,
        },
    },
} as const;
