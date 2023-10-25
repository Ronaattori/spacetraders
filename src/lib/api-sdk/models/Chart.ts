/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The chart of a system or waypoint, which makes the location visible to other agents.
 */
export type Chart = {
    /**
     * The symbol of the waypoint.
     */
    waypointSymbol?: string;
    /**
     * The agent that submitted the chart for this waypoint.
     */
    submittedBy?: string;
    /**
     * The time the chart for this waypoint was submitted.
     */
    submittedOn?: string;
};

