/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Chart } from '../models/Chart';
import type { Contract } from '../models/Contract';
import type { Cooldown } from '../models/Cooldown';
import type { Extraction } from '../models/Extraction';
import type { MarketTransaction } from '../models/MarketTransaction';
import type { Meta } from '../models/Meta';
import type { ScannedShip } from '../models/ScannedShip';
import type { ScannedSystem } from '../models/ScannedSystem';
import type { ScannedWaypoint } from '../models/ScannedWaypoint';
import type { Ship } from '../models/Ship';
import type { ShipCargo } from '../models/ShipCargo';
import type { ShipFuel } from '../models/ShipFuel';
import type { ShipModificationTransaction } from '../models/ShipModificationTransaction';
import type { ShipMount } from '../models/ShipMount';
import type { ShipNav } from '../models/ShipNav';
import type { ShipNavFlightMode } from '../models/ShipNavFlightMode';
import type { ShipType } from '../models/ShipType';
import type { ShipyardTransaction } from '../models/ShipyardTransaction';
import type { Siphon } from '../models/Siphon';
import type { Survey } from '../models/Survey';
import type { TradeSymbol } from '../models/TradeSymbol';
import type { Waypoint } from '../models/Waypoint';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FleetService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List Ships
     * Return a paginated list of all of ships under your agent's ownership.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Succesfully listed ships.
     * @throws ApiError
     */
    public getMyShips(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<Ship>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }

    /**
     * Purchase Ship
     * Purchase a ship from a Shipyard. In order to use this function, a ship under your agent's ownership must be in a waypoint that has the `Shipyard` trait, and the Shipyard must sell the type of the desired ship.
     *
     * Shipyards typically offer ship types, which are predefined templates of ships that have dedicated roles. A template comes with a preset of an engine, a reactor, and a frame. It may also include a few modules and mounts.
     * @param requestBody
     * @returns any Purchased ship successfully.
     * @throws ApiError
     */
    public purchaseShip(
        requestBody?: {
            shipType: ShipType;
            /**
             * The symbol of the waypoint you want to purchase the ship at.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            ship: Ship;
            transaction: ShipyardTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get Ship
     * Retrieve the details of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship.
     * @throws ApiError
     */
    public getMyShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Ship;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships/{shipSymbol}',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Get Ship Cargo
     * Retrieve the cargo of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship's cargo.
     * @throws ApiError
     */
    public getMyShipCargo(
        shipSymbol: string,
    ): CancelablePromise<{
        data: ShipCargo;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cargo',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Orbit Ship
     * Attempt to move your ship into orbit at its current location. The request will only succeed if your ship is capable of moving into orbit at the time of the request.
     *
     * Orbiting ships are able to do actions that require the ship to be above surface such as navigating or extracting, but cannot access elements in their current waypoint, such as the market or a shipyard.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already in orbit.
     * @param shipSymbol The symbol of the ship.
     * @returns any The ship has successfully moved into orbit at its current location.
     * @throws ApiError
     */
    public orbitShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/orbit',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Ship Refine
     * Attempt to refine the raw materials on your ship. The request will only succeed if your ship is capable of refining at the time of the request. In order to be able to refine, a ship must have goods that can be refined and have installed a `Refinery` module that can refine it.
     *
     * When refining, 30 basic goods will be converted into 10 processed goods.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any The ship has successfully refined goods.
     * @throws ApiError
     */
    public shipRefine(
        shipSymbol: string,
        requestBody?: {
            /**
             * The type of good to produce out of the refining process.
             */
            produce: 'IRON' | 'COPPER' | 'SILVER' | 'GOLD' | 'ALUMINUM' | 'PLATINUM' | 'URANITE' | 'MERITIUM' | 'FUEL';
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
            cooldown: Cooldown;
            /**
             * Goods that were produced by this refining process.
             */
            produced: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: string;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
            /**
             * Goods that were consumed during this refining process.
             */
            consumed: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: string;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refine',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create Chart
     * Command a ship to chart the waypoint at its current location.
     *
     * Most waypoints in the universe are uncharted by default. These waypoints have their traits hidden until they have been charted by a ship.
     *
     * Charting a waypoint will record your agent as the one who created the chart, and all other agents would also be able to see the waypoint's traits.
     * @param shipSymbol The symbol of the ship.
     * @returns any Created
     * @throws ApiError
     */
    public createChart(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            chart: Chart;
            waypoint: Waypoint;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/chart',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Get Ship Cooldown
     * Retrieve the details of your ship's reactor cooldown. Some actions such as activating your jump drive, scanning, or extracting resources taxes your reactor and results in a cooldown.
     *
     * Your ship cannot perform additional actions until your cooldown has expired. The duration of your cooldown is relative to the power consumption of the related modules or mounts for the action taken.
     *
     * Response returns a 204 status code (no-content) when the ship has no cooldown.
     * @param shipSymbol The symbol of the ship.
     * @returns any Succesfully fetched ship's cooldown.
     * @throws ApiError
     */
    public getShipCooldown(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Cooldown;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cooldown',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Dock Ship
     * Attempt to dock your ship at its current location. Docking will only succeed if your ship is capable of docking at the time of the request.
     *
     * Docked ships can access elements in their current location, such as the market or a shipyard, but cannot do actions that require the ship to be above surface such as navigating or extracting.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already docked.
     * @param shipSymbol The symbol of the ship.
     * @returns any The ship has successfully docked at its current location.
     * @throws ApiError
     */
    public dockShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/dock',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Create Survey
     * Create surveys on a waypoint that can be extracted such as asteroid fields. A survey focuses on specific types of deposits from the extracted location. When ships extract using this survey, they are guaranteed to procure a high amount of one of the goods in the survey.
     *
     * In order to use a survey, send the entire survey details in the body of the extract request.
     *
     * Each survey may have multiple deposits, and if a symbol shows up more than once, that indicates a higher chance of extracting that resource.
     *
     * Your ship will enter a cooldown after surveying in which it is unable to perform certain actions. Surveys will eventually expire after a period of time or will be exhausted after being extracted several times based on the survey's size. Multiple ships can use the same survey for extraction.
     *
     * A ship must have the `Surveyor` mount installed in order to use this function.
     * @param shipSymbol The symbol of the ship.
     * @returns any Surveys has been created.
     * @throws ApiError
     */
    public createSurvey(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * Surveys created by this action.
             */
            surveys: Array<Survey>;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Extract Resources
     * Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship. Send an optional survey as the payload to target specific yields.
     *
     * The ship must be in orbit to be able to extract and must have mining equipments installed that can extract goods, such as the `Gas Siphon` mount for gas-based goods or `Mining Laser` mount for ore-based goods.
     *
     * The survey property is now deprecated. See the `extract/survey` endpoint for more details.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Extracted successfully.
     * @throws ApiError
     */
    public extractResources(
        shipSymbol: string,
        requestBody?: {
            /**
             * @deprecated
             */
            survey?: Survey;
        },
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            extraction: Extraction;
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Siphon Resources
     * Siphon gases, such as hydrocarbon, from gas giants.
     *
     * The ship must be in orbit to be able to siphon and must have siphon mounts and a gas processor installed.
     * @param shipSymbol The ship symbol.
     * @returns any Siphon successful.
     * @throws ApiError
     */
    public siphonResources(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            siphon: Siphon;
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/siphon',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Extract Resources with Survey
     * Use a survey when extracting resources from a waypoint. This endpoint requires a survey as the payload, which allows your ship to extract specific yields.
     *
     * Send the full survey object as the payload which will be validated according to the signature. If the signature is invalid, or any properties of the survey are changed, the request will fail.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Extracted successfully.
     * @throws ApiError
     */
    public extractResourcesWithSurvey(
        shipSymbol: string,
        requestBody?: Survey,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            extraction: Extraction;
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Jettison Cargo
     * Jettison cargo from your ship's cargo hold.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Jettison successful.
     * @throws ApiError
     */
    public jettison(
        shipSymbol: string,
        requestBody?: {
            symbol: TradeSymbol;
            /**
             * Amount of units to jettison of this good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jettison',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Jump Ship
     * Jump your ship instantly to a target connected waypoint. The ship must be in orbit to execute a jump.
     *
     * A unit of antimatter is purchased and consumed from the market when jumping. The price of antimatter is determined by the market and is subject to change. A ship can only jump to connected waypoints
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Jump successful.
     * @throws ApiError
     */
    public jumpShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the waypoint to jump to. The destination must be a connected waypoint.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            nav: ShipNav;
            cooldown: Cooldown;
            transaction: MarketTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jump',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Navigate Ship
     * Navigate to a target destination. The ship must be in orbit to use this function. The destination waypoint must be within the same system as the ship's current location. Navigating will consume the necessary fuel from the ship's manifest based on the distance to the target waypoint.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at it's destination.
     *
     * To travel between systems, see the ship's Warp or Jump actions.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public navigateShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The target destination.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            fuel: ShipFuel;
            nav: ShipNav;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/navigate',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Patch Ship Nav
     * Update the nav configuration of a ship.
     *
     * Currently only supports configuring the Flight Mode of the ship, which affects its speed and fuel consumption.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The updated nav data of the ship.
     * @throws ApiError
     */
    public patchShipNav(
        shipSymbol: string,
        requestBody?: {
            flightMode?: ShipNavFlightMode;
        },
    ): CancelablePromise<{
        data: ShipNav;
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get Ship Nav
     * Get the current nav status of a ship.
     * @param shipSymbol The ship symbol.
     * @returns any The current nav status of the ship.
     * @throws ApiError
     */
    public getShipNav(
        shipSymbol: string,
    ): CancelablePromise<{
        data: ShipNav;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Warp Ship
     * Warp your ship to a target destination in another system. The ship must be in orbit to use this function and must have the `Warp Drive` module installed. Warping will consume the necessary fuel from the ship's manifest.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at its destination.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public warpShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The target destination.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            fuel: ShipFuel;
            nav: ShipNav;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/warp',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Sell Cargo
     * Sell cargo in your ship to a market that trades this cargo. The ship must be docked in a waypoint that has the `Marketplace` trait in order to use this function.
     * @param shipSymbol Symbol of a ship.
     * @param requestBody
     * @returns any Cargo was successfully sold.
     * @throws ApiError
     */
    public sellCargo(
        shipSymbol: string,
        requestBody?: {
            symbol: TradeSymbol;
            /**
             * Amounts of units to sell of the selected good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            cargo: ShipCargo;
            transaction: MarketTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/sell',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Scan Systems
     * Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints. Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby systems.
     * @throws ApiError
     */
    public createShipSystemScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned systems.
             */
            systems: Array<ScannedSystem>;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/systems',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Scan Waypoints
     * Scan for nearby waypoints, retrieving detailed information on each waypoint in range. Scanning uncharted waypoints will allow you to ignore their uncharted state and will list the waypoints' traits.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby waypoints.
     * @throws ApiError
     */
    public createShipWaypointScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned waypoints.
             */
            waypoints: Array<ScannedWaypoint>;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/waypoints',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Scan Ships
     * Scan for nearby ships, retrieving information for all ships in range.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby ships.
     * @throws ApiError
     */
    public createShipShipScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: Cooldown;
            /**
             * List of scanned ships.
             */
            ships: Array<ScannedShip>;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/ships',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Refuel Ship
     * Refuel your ship by buying fuel from the local market.
     *
     * Requires the ship to be docked in a waypoint that has the `Marketplace` trait, and the market must be selling fuel in order to refuel.
     *
     * Each fuel bought from the market replenishes 100 units in your ship's fuel.
     *
     * Ships will always be refuel to their frame's maximum fuel capacity when using this action.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Refueled successfully.
     * @throws ApiError
     */
    public refuelShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The amount of fuel to fill in the ship's tanks. When not specified, the ship will be refueled to its maximum fuel capacity. If the amount specified is greater than the ship's remaining capacity, the ship will only be refueled to its maximum fuel capacity. The amount specified is not in market units but in ship fuel units.
             */
            units?: number;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            fuel: ShipFuel;
            transaction: MarketTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refuel',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Purchase Cargo
     * Purchase cargo from a market.
     *
     * The ship must be docked in a waypoint that has `Marketplace` trait, and the market must be selling a good to be able to purchase it.
     *
     * The maximum amount of units of a good that can be purchased in each transaction are denoted by the `tradeVolume` value of the good, which can be viewed by using the Get Market action.
     *
     * Purchased goods are added to the ship's cargo hold.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Purchased goods successfully.
     * @throws ApiError
     */
    public purchaseCargo(
        shipSymbol: string,
        requestBody?: {
            symbol: TradeSymbol;
            /**
             * Amounts of units to purchase.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            cargo: ShipCargo;
            transaction: MarketTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/purchase',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Transfer Cargo
     * Transfer cargo between ships.
     *
     * The receiving ship must be in the same waypoint as the transferring ship, and it must able to hold the additional cargo after the transfer is complete. Both ships also must be in the same state, either both are docked or both are orbiting.
     *
     * The response body's cargo shows the cargo of the transferring ship after the transfer is complete.
     * @param shipSymbol The transferring ship's symbol.
     * @param requestBody
     * @returns any Transfer successful.
     * @throws ApiError
     */
    public transferCargo(
        shipSymbol: string,
        requestBody?: {
            tradeSymbol: TradeSymbol;
            /**
             * Amount of units to transfer.
             */
            units: number;
            /**
             * The symbol of the ship to transfer to.
             */
            shipSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/transfer',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Negotiate Contract
     * Negotiate a new contract with the HQ.
     *
     * In order to negotiate a new contract, an agent must not have ongoing or offered contracts over the allowed maximum amount. Currently the maximum contracts an agent can have at a time is 1.
     *
     * Once a contract is negotiated, it is added to the list of contracts offered to the agent, which the agent can then accept.
     *
     * The ship must be present at any waypoint with a faction present to negotiate a contract with that faction.
     * @param shipSymbol The ship's symbol.
     * @returns any Successfully negotiated a new contract.
     * @throws ApiError
     */
    public negotiateContract(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            contract: Contract;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/negotiate/contract',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Get Mounts
     * Get the mounts installed on a ship.
     * @param shipSymbol The ship's symbol.
     * @returns any Got installed mounts.
     * @throws ApiError
     */
    public getMounts(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Array<ShipMount>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/ships/{shipSymbol}/mounts',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }

    /**
     * Install Mount
     * Install a mount on a ship.
     *
     * In order to install a mount, the ship must be docked and located in a waypoint that has a `Shipyard` trait. The ship also must have the mount to install in its cargo hold.
     *
     * An installation fee will be deduced by the Shipyard for installing the mount on the ship.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Successfully installed the mount.
     * @throws ApiError
     */
    public installMount(
        shipSymbol: string,
        requestBody?: {
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            /**
             * List of installed mounts after the installation of the new mount.
             */
            mounts: Array<ShipMount>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/install',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Remove Mount
     * Remove a mount from a ship.
     *
     * The ship must be docked in a waypoint that has the `Shipyard` trait, and must have the desired mount that it wish to remove installed.
     *
     * A removal fee will be deduced from the agent by the Shipyard.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Successfully removed the mount.
     * @throws ApiError
     */
    public removeMount(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the mount to remove.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: Agent;
            /**
             * List of installed mounts after the removal of the selected mount.
             */
            mounts: Array<ShipMount>;
            cargo: ShipCargo;
            transaction: ShipModificationTransaction;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/remove',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
