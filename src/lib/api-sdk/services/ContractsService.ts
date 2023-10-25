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
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Succesfully listed contracts.
     * @throws ApiError
     */
    public getContracts(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
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
     * @param contractId The contract ID
     * @returns any Successfully fetched contract.
     * @throws ApiError
     */
    public getContract(
        contractId: string,
    ): CancelablePromise<{
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
     * @param contractId The contract ID to accept.
     * @returns any Succesfully accepted contract.
     * @throws ApiError
     */
    public acceptContract(
        contractId: string,
    ): CancelablePromise<{
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
     * @param contractId The ID of the contract.
     * @param requestBody
     * @returns any Successfully delivered cargo to contract.
     * @throws ApiError
     */
    public deliverContract(
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
    ): CancelablePromise<{
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
     * @param contractId The ID of the contract to fulfill.
     * @returns any Successfully fulfilled a contract.
     * @throws ApiError
     */
    public fulfillContract(
        contractId: string,
    ): CancelablePromise<{
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
