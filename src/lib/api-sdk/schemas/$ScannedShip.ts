/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScannedShip = {
    description: `The ship that was scanned. Details include information about the ship that could be detected by the scanner.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The globally unique identifier of the ship.`,
            isRequired: true,
        },
        registration: {
            type: 'ShipRegistration',
            isRequired: true,
        },
        nav: {
            type: 'ShipNav',
            isRequired: true,
        },
        frame: {
            description: `The frame of the ship.`,
            properties: {
                symbol: {
                    type: 'string',
                    description: `The symbol of the frame.`,
                    isRequired: true,
                },
            },
        },
        reactor: {
            description: `The reactor of the ship.`,
            properties: {
                symbol: {
                    type: 'string',
                    description: `The symbol of the reactor.`,
                    isRequired: true,
                },
            },
        },
        engine: {
            description: `The engine of the ship.`,
            properties: {
                symbol: {
                    type: 'string',
                    description: `The symbol of the engine.`,
                    isRequired: true,
                },
            },
            isRequired: true,
        },
        mounts: {
            type: 'array',
            contains: {
                description: `A mount on the ship.`,
                properties: {
                    symbol: {
                        type: 'string',
                        description: `The symbol of the mount.`,
                        isRequired: true,
                    },
                },
            },
        },
    },
} as const;
