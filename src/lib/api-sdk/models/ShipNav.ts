/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ShipNavFlightMode } from './ShipNavFlightMode';
import type { ShipNavRoute } from './ShipNavRoute';
import type { ShipNavStatus } from './ShipNavStatus';

/**
 * The navigation information of the ship.
 */
export type ShipNav = {
    /**
     * The system symbol of the ship's current location.
     */
    systemSymbol: string;
    /**
     * The waypoint symbol of the ship's current location, or if the ship is in-transit, the waypoint symbol of the ship's destination.
     */
    waypointSymbol: string;
    route: ShipNavRoute;
    status: ShipNavStatus;
    flightMode: ShipNavFlightMode;
};

