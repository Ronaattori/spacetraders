/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WaypointType } from './WaypointType';

/**
 * The destination or departure of a ships nav route.
 */
export type ShipNavRouteWaypoint = {
    /**
     * The symbol of the waypoint.
     */
    symbol: string;
    type: WaypointType;
    /**
     * The symbol of the system the waypoint is in.
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
};

