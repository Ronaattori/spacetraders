/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $WaypointOrbital = {
    description: `An orbital is another waypoint that orbits a parent waypoint.`,
    properties: {
        symbol: {
            type: 'string',
            description: `The symbol of the orbiting waypoint.`,
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
