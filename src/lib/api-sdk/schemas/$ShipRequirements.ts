/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipRequirements = {
    description: `The requirements for installation on a ship`,
    properties: {
        power: {
            type: 'number',
            description: `The amount of power required from the reactor.`,
        },
        crew: {
            type: 'number',
            description: `The number of crew required for operation.`,
        },
        slots: {
            type: 'number',
            description: `The number of module slots required for installation.`,
        },
    },
} as const;
