/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Contract } from '../models/Contract';
import type { Faction } from '../models/Faction';
import type { FactionSymbol } from '../models/FactionSymbol';
import type { Ship } from '../models/Ship';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Status
     * Return the status of the game server.
     * This also includes a few global elements, such as announcements, server reset dates and leaderboards.
     * @returns any Fetched status successfully.
     * @throws ApiError
     */
    public getStatus(): CancelablePromise<{
        /**
         * The current status of the game server.
         */
        status: string;
        /**
         * The current version of the API.
         */
        version: string;
        /**
         * The date when the game server was last reset.
         */
        resetDate: string;
        description: string;
        stats: {
            /**
             * Number of registered agents in the game.
             */
            agents: number;
            /**
             * Total number of ships in the game.
             */
            ships: number;
            /**
             * Total number of systems in the game.
             */
            systems: number;
            /**
             * Total number of waypoints in the game.
             */
            waypoints: number;
        };
        leaderboards: {
            /**
             * Top agents with the most credits.
             */
            mostCredits: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of credits.
                 */
                credits: number;
            }>;
            /**
             * Top agents with the most charted submitted.
             */
            mostSubmittedCharts: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of charts done by the agent.
                 */
                chartCount: number;
            }>;
        };
        serverResets: {
            /**
             * The date and time when the game server will reset.
             */
            next: string;
            /**
             * How often we intend to reset the game server.
             */
            frequency: string;
        };
        announcements: Array<{
            title: string;
            body: string;
        }>;
        links: Array<{
            name: string;
            url: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Register New Agent
     * Creates a new agent and ties it to an account.
     * The agent symbol must consist of a 3-14 character string, and will be used to represent your agent. This symbol will prefix the symbol of every ship you own. Agent symbols will be cast to all uppercase characters.
     *
     * This new agent will be tied to a starting faction of your choice, which determines your starting location, and will be granted an authorization token, a contract with their starting faction, a command ship that can fly across space with advanced capabilities, a small probe ship that can be used for reconnaissance, and 150,000 credits.
     *
     * > #### Keep your token safe and secure
     * >
     * > Save your token during the alpha phase. There is no way to regenerate this token without starting a new agent. In the future you will be able to generate and manage your tokens from the SpaceTraders website.
     *
     * If you are new to SpaceTraders, It is recommended to register with the COSMIC faction, a faction that is well connected to the rest of the universe. After registering, you should try our interactive [quickstart guide](https://docs.spacetraders.io/quickstart/new-game) which will walk you through basic API requests in just a few minutes.
     * @returns any Succesfully registered.
     * @throws ApiError
     */
    public register({
        requestBody,
    }: {
        requestBody?: {
            faction: FactionSymbol;
            /**
             * Your desired agent symbol. This will be a unique name used to represent your agent, and will be the prefix for your ships.
             */
            symbol: string;
            /**
             * Your email address. This is used if you reserved your call sign between resets.
             */
            email?: string;
        },
    }): CancelablePromise<{
        data: {
            agent: Agent;
            contract: Contract;
            faction: Faction;
            ship: Ship;
            /**
             * A Bearer token for accessing secured API endpoints.
             */
            token: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
