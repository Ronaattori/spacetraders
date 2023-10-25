/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipCrew = {
    description: `The ship's crew service and maintain the ship's systems and equipment.`,
    properties: {
        current: {
            type: 'number',
            description: `The current number of crew members on the ship.`,
            isRequired: true,
        },
        required: {
            type: 'number',
            description: `The minimum number of crew members required to maintain the ship.`,
            isRequired: true,
        },
        capacity: {
            type: 'number',
            description: `The maximum number of crew members the ship can support.`,
            isRequired: true,
        },
        rotation: {
            type: 'Enum',
            isRequired: true,
        },
        morale: {
            type: 'number',
            description: `A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.`,
            isRequired: true,
            maximum: 100,
        },
        wages: {
            type: 'number',
            description: `The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.`,
            isRequired: true,
        },
    },
} as const;
