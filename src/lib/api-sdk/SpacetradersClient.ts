/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AgentsService } from './services/AgentsService';
import { ContractsService } from './services/ContractsService';
import { DefaultService } from './services/DefaultService';
import { FactionsService } from './services/FactionsService';
import { FleetService } from './services/FleetService';
import { SystemsService } from './services/SystemsService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class SpacetradersClient {

    public readonly agents: AgentsService;
    public readonly contracts: ContractsService;
    public readonly default: DefaultService;
    public readonly factions: FactionsService;
    public readonly fleet: FleetService;
    public readonly systems: SystemsService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.spacetraders.io/v2',
            VERSION: config?.VERSION ?? '2.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.agents = new AgentsService(this.request);
        this.contracts = new ContractsService(this.request);
        this.default = new DefaultService(this.request);
        this.factions = new FactionsService(this.request);
        this.fleet = new FleetService(this.request);
        this.systems = new SystemsService(this.request);
    }
}

