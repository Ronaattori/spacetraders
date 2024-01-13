/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaypointSymbol } from './WaypointSymbol';
export type JumpGate = {
    symbol: WaypointSymbol;
    /**
     * All the gates that are connected to this waypoint.
     */
    connections: Array<string>;
};

