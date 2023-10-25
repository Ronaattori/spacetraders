/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipNavRoute = {
    description: `The routing information for the ship's most recent transit or current location.`,
    properties: {
        destination: {
            type: 'ShipNavRouteWaypoint',
            isRequired: true,
        },
        departure: {
            type: 'ShipNavRouteWaypoint',
            description: `Deprecated. Use origin instead.`,
            isRequired: true,
        },
        origin: {
            type: 'ShipNavRouteWaypoint',
            isRequired: true,
        },
        departureTime: {
            type: 'string',
            description: `The date time of the ship's departure.`,
            isRequired: true,
            format: 'date-time',
        },
        arrival: {
            type: 'string',
            description: `The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival.`,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
