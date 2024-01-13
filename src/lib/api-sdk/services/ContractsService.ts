/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { Contract } from '../models/Contract';
import type { Meta } from '../models/Meta';
import type { ShipCargo } from '../models/ShipCargo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ContractsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Contracts
     * Return a paginated list of all your contracts.
     * @returns any Succesfully listed contracts.
     * @throws ApiError
     */
    public getContracts({
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
        data: Array<Contract>;
        meta: Meta;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/contracts',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Contract
     * Get the details of a contract by ID.
     * @returns any Successfully fetched contract.
     * @throws ApiError
     */
    public getContract({
        contractId,
    }: {
        /**
         * The contract ID
         */
        contractId: string,
    }): CancelablePromise<{
        data: Contract;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/my/contracts/{contractId}',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Accept Contract
     * Accept a contract by ID.
     *
     * You can only accept contracts that were offered to you, were not accepted yet, and whose deadlines has not passed yet.
     * @returns any Succesfully accepted contract.
     * @throws ApiError
     */
    public acceptContract({
        contractId,
    }: {
        /**
         * The contract ID to accept.
         */
        contractId: string,
    }): CancelablePromise<{
        data: {
            agent: Agent;
            contract: Contract;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/contracts/{contractId}/accept',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Deliver Cargo to Contract
     * Deliver cargo to a contract.
     *
     * In order to use this API, a ship must be at the delivery location (denoted in the delivery terms as `destinationSymbol` of a contract) and must have a number of units of a good required by this contract in its cargo.
     *
     * Cargo that was delivered will be removed from the ship's cargo.
     * @returns any Successfully delivered cargo to contract.
     * @throws ApiError
     */
    public deliverContract({
        contractId,
        requestBody,
    }: {
        /**
         * The ID of the contract.
         */
        contractId: string,
        requestBody?: {
            /**
             * Symbol of a ship located in the destination to deliver a contract and that has a good to deliver in its cargo.
             */
            shipSymbol: string;
            /**
             * The symbol of the good to deliver.
             */
            tradeSymbol: string;
            /**
             * Amount of units to deliver.
             */
            units: number;
        },
    }): CancelablePromise<{
        data: {
            contract: Contract;
            cargo: ShipCargo;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/contracts/{contractId}/deliver',
            path: {
                'contractId': contractId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Fulfill Contract
     * Fulfill a contract. Can only be used on contracts that have all of their delivery terms fulfilled.
     * @returns any Successfully fulfilled a contract.
     * @throws ApiError
     */
    public fulfillContract({
        contractId,
    }: {
        /**
         * The ID of the contract to fulfill.
         */
        contractId: string,
    }): CancelablePromise<{
        data: {
            agent: Agent;
            contract: Contract;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/my/contracts/{contractId}/fulfill',
            path: {
                'contractId': contractId,
            },
        });
    }
}
