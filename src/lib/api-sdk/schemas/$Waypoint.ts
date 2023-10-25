/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Waypoint = {
    description: `A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station.`,
    properties: {
        symbol: {
            type: 'string',
            description: `Symbol fo the waypoint.`,
            isRequired: true,
            minLength: 1,
        },
        type: {
            type: 'WaypointType',
            isRequired: true,
        },
        systemSymbol: {
            type: 'string',
            description: `The symbol of the system this waypoint belongs to.`,
            isRequired: true,
            minLength: 1,
        },
        'x': {
            type: 'number',
            description: `Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe.`,
            isRequired: true,
        },
        'y': {
            type: 'number',
            description: `Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe.`,
            isRequired: true,
        },
        orbitals: {
            type: 'array',
            contains: {
                type: 'WaypointOrbital',
            },
            isRequired: true,
        },
        orbits: {
            type: 'string',
            description: `The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined.`,
            minLength: 1,
        },
        faction: {
            type: 'WaypointFaction',
        },
        traits: {
            type: 'array',
            contains: {
                type: 'WaypointTrait',
            },
            isRequired: true,
        },
        chart: {
            type: 'Chart',
        },
    },
} as const;
