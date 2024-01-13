/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Meta } from '../models/Meta';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AgentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Agent
     * Fetch your agent's details.
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public getMyAgent(): CancelablePromise<{
        data: Agent;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/agent',
        });
    }
    /**
     * List Agents
     * Fetch agents details.
     * @returns any Successfully fetched agents details.
     * @throws ApiError
     */
    public getAgents({
        page = 1,
        limit = 10,
    }: {
        /**
         * What entry offset to request
         */
        page?: number,
        /**
         * How many entries to return per page
         */
        limit?: number,
    }): CancelablePromise<{
        data: Array<Agent>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/agents',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Public Agent
     * Fetch agent details.
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public getAgent({
        agentSymbol = 'FEBA66',
    }: {
        /**
         * The agent symbol
         */
        agentSymbol?: string,
    }): CancelablePromise<{
        data: Agent;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/agents/{agentSymbol}',
            path: {
                'agentSymbol': agentSymbol,
            },
        });
    }
}
