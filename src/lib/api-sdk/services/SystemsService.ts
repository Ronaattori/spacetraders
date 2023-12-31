/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Construction } from '../models/Construction';
import type { JumpGate } from '../models/JumpGate';
import type { Market } from '../models/Market';
import type { Meta } from '../models/Meta';
import type { ShipCargo } from '../models/ShipCargo';
import type { Shipyard } from '../models/Shipyard';
import type { System } from '../models/System';
import type { Waypoint } from '../models/Waypoint';
import type { WaypointTrait } from '../models/WaypointTrait';
import type { WaypointType } from '../models/WaypointType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SystemsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List Systems
     * Return a paginated list of all systems.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed systems.
     * @throws ApiError
     */
    public getSystems(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<System>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }

    /**
     * Get System
     * Get the details of a system.
     * @param systemSymbol The system symbol
     * @returns any Successfully fetched the system.
     * @throws ApiError
     */
    public getSystem(
        systemSymbol: string = 'X1-OE',
    ): CancelablePromise<{
        data: System;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}',
            path: {
                'systemSymbol': systemSymbol,
            },
        });
    }

    /**
     * List Waypoints in System
     * Return a paginated list of all of the waypoints for a given system.
     *
     * If a waypoint is uncharted, it will return the `Uncharted` trait instead of its actual traits.
     * @param systemSymbol The system symbol
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @param type Filter waypoints by type.
     * @param traits Filter waypoints by one or more traits.
     * @returns any Successfully fetched all waypoints in the system.
     * @throws ApiError
     */
    public getSystemWaypoints(
        systemSymbol: string,
        page: number = 1,
        limit: number = 10,
        type?: WaypointType,
        traits?: (WaypointTrait | Array<WaypointTrait>),
    ): CancelablePromise<{
        data: Array<Waypoint>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints',
            path: {
                'systemSymbol': systemSymbol,
            },
            query: {
                'page': page,
                'limit': limit,
                'type': type,
                'traits': traits,
            },
        });
    }

    /**
     * Get Waypoint
     * View the details of a waypoint.
     *
     * If the waypoint is uncharted, it will return the 'Uncharted' trait instead of its actual traits.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched waypoint.
     * @throws ApiError
     */
    public getWaypoint(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Waypoint;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }

    /**
     * Get Market
     * Retrieve imports, exports and exchange data from a marketplace. Requires a waypoint that has the `Marketplace` trait to use.
     *
     * Send a ship to the waypoint to access trade good prices and recent transactions. Refer to the [Market Overview page](https://docs.spacetraders.io/game-concepts/markets) to gain better a understanding of the market in the game.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched the market.
     * @throws ApiError
     */
    public getMarket(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Market;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/market',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }

    /**
     * Get Shipyard
     * Get the shipyard for a waypoint. Requires a waypoint that has the `Shipyard` trait to use. Send a ship to the waypoint to access data on ships that are currently available for purchase and recent transactions.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched the shipyard.
     * @throws ApiError
     */
    public getShipyard(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Shipyard;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/shipyard',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }

    /**
     * Get Jump Gate
     * Get jump gate details for a waypoint. Requires a waypoint of type `JUMP_GATE` to use.
     *
     * Waypoints connected to this jump gate can be
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched jump gate.
     * @throws ApiError
     */
    public getJumpGate(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: JumpGate;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/jump-gate',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }

    /**
     * Get Construction Site
     * Get construction details for a waypoint. Requires a waypoint with a property of `isUnderConstruction` to be true.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @returns any Successfully fetched construction site.
     * @throws ApiError
     */
    public getConstruction(
        systemSymbol: string,
        waypointSymbol: string,
    ): CancelablePromise<{
        data: Construction;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
        });
    }

    /**
     * Supply Construction Site
     * Supply a construction site with the specified good. Requires a waypoint with a property of `isUnderConstruction` to be true.
     *
     * The good must be in your ship's cargo. The good will be removed from your ship's cargo and added to the construction site's materials.
     * @param systemSymbol The system symbol
     * @param waypointSymbol The waypoint symbol
     * @param requestBody
     * @returns any Successfully supplied construction site.
     * @throws ApiError
     */
    public supplyConstruction(
        systemSymbol: string,
        waypointSymbol: string,
        requestBody?: {
            /**
             * Symbol of the ship to use.
             */
            shipSymbol: string;
            /**
             * The symbol of the good to supply.
             */
            tradeSymbol: string;
            /**
             * Amount of units to supply.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            construction: Construction;
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction/supply',
            path: {
                'systemSymbol': systemSymbol,
                'waypointSymbol': waypointSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
