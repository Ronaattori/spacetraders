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
 * A waypoint that was scanned by a ship.
 */
export type ScannedWaypoint = {
    /**
     * Symbol of the waypoint.
     */
    symbol: string;
    type: WaypointType;
    /**
     * Symbol of the system.
     */
    systemSymbol: string;
    /**
     * Position in the universe in the x axis.
     */
    'x': number;
    /**
     * Position in the universe in the y axis.
     */
    'y': number;
    /**
     * List of waypoints that orbit this waypoint.
     */
    orbitals: Array<WaypointOrbital>;
    faction?: WaypointFaction;
    /**
     * The traits of the waypoint.
     */
    traits: Array<WaypointTrait>;
    chart?: Chart;
};

