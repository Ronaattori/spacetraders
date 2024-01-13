/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Waypoint = {
    description: `A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station.`,
    properties: {
        symbol: {
            type: 'WaypointSymbol',
            isRequired: true,
        },
        type: {
            type: 'WaypointType',
            isRequired: true,
        },
        systemSymbol: {
            type: 'SystemSymbol',
            isRequired: true,
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
        modifiers: {
            type: 'array',
            contains: {
                type: 'WaypointModifier',
            },
        },
        chart: {
            type: 'Chart',
        },
        isUnderConstruction: {
            type: 'boolean',
            description: `True if the waypoint is under construction.`,
            isRequired: true,
        },
    },
} as const;
