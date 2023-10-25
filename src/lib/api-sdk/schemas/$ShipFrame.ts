/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipFrame = {
    description: `The frame of the ship. The frame determines the number of modules and mounting points of the ship, as well as base fuel capacity. As the condition of the frame takes more wear, the ship will become more sluggish and less maneuverable.`,
    properties: {
        symbol: {
            type: 'Enum',
            isRequired: true,
        },
        name: {
            type: 'string',
            description: `Name of the frame.`,
            isRequired: true,
        },
        description: {
            type: 'string',
            description: `Description of the frame.`,
            isRequired: true,
        },
        condition: {
            type: 'ShipCondition',
        },
        moduleSlots: {
            type: 'number',
            description: `The amount of slots that can be dedicated to modules installed in the ship. Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed.`,
            isRequired: true,
        },
        mountingPoints: {
            type: 'number',
            description: `The amount of slots that can be dedicated to mounts installed in the ship. Each installed mount takes up a number of points, and once there are no more points remaining, no new mounts can be installed.`,
            isRequired: true,
        },
        fuelCapacity: {
            type: 'number',
            description: `The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount.`,
            isRequired: true,
        },
        requirements: {
            type: 'ShipRequirements',
            isRequired: true,
        },
    },
} as const;
