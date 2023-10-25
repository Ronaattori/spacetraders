/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chart } from './Chart';
import type { WaypointFaction } from './WaypointFaction';
import type { WaypointOrbital } from './WaypointOrbital';
import type { WaypointTrait } from './WaypointTrait';
import type { WaypointType } from './WaypointType';

/**
 * A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station.
 */
export type Waypoint = {
    /**
     * Symbol fo the waypoint.
     */
    symbol: string;
    type: WaypointType;
    /**
     * The symbol of the system this waypoint belongs to.
     */
    systemSymbol: string;
    /**
     * Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe.
     */
    'x': number;
    /**
     * Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe.
     */
    'y': number;
    /**
     * Waypoints that orbit this waypoint.
     */
    orbitals: Array<WaypointOrbital>;
    /**
     * The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined.
     */
    orbits?: string;
    faction?: WaypointFaction;
    /**
     * The traits of the waypoint.
     */
    traits: Array<WaypointTrait>;
    chart?: Chart;
};

