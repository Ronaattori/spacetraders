/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Faction } from '../models/Faction';
import type { Meta } from '../models/Meta';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FactionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Factions
     * Return a paginated list of all the factions in the game.
     * @returns any Succesfully fetched factions.
     * @throws ApiError
     */
    public getFactions({
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
        data: Array<Faction>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/factions',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Faction
     * View the details of a faction.
     * @returns any Successfully fetched a faction.
     * @throws ApiError
     */
    public getFaction({
        factionSymbol,
    }: {
        /**
         * The faction symbol
         */
        factionSymbol: string,
    }): CancelablePromise<{
        data: Faction;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/factions/{factionSymbol}',
            path: {
                'factionSymbol': factionSymbol,
            },
        });
    }
}
