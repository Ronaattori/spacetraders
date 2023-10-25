/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipEngine = {
    description: `The engine determines how quickly a ship travels between waypoints.`,
    properties: {
        symbol: {
            type: 'Enum',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `The name of the engine.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `The description of the engine.`,
            isRequired: true,
        },
        condition: {
            type: 'ShipCondition',
        },
        speed: {
            type: 'number',
            description: `The speed stat of this engine. The higher the speed, the faster a ship can travel from one point to another. Reduces the time of arrival when navigating the ship.`,
            isRequired: true,
            minimum: 1,
        },
        requirements: {
            type: 'ShipRequirements',
            isRequired: true,
        },
    },
} as const;
