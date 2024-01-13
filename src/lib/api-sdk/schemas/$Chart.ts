/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Chart = {
    description: `The chart of a system or waypoint, which makes the location visible to other agents.`,
    properties: {
        waypointSymbol: {
            type: 'WaypointSymbol',
        },
        submittedBy: {
            type: 'string',
            description: `The agent that submitted the chart for this waypoint.`,
        },
        submittedOn: {
            type: 'string',
            description: `The time the chart for this waypoint was submitted.`,
            format: 'date-time',
        },
    },
} as const;
