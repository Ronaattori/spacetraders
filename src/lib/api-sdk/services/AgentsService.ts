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
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully fetched agents details.
     * @throws ApiError
     */
    public getAgents(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
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
     * @param agentSymbol The agent symbol
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public getAgent(
        agentSymbol: string = 'FEBA66',
    ): CancelablePromise<{
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
