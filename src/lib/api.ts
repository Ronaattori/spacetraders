import { writable } from "svelte/store";
import { AgentsApi } from "./spacetraders-sdk";
import { Configuration } from "./spacetraders-sdk";
import { ContractsApi } from "./spacetraders-sdk";
import { DefaultApi } from "./spacetraders-sdk";
import { FactionsApi } from "./spacetraders-sdk";
import { FleetApi } from "./spacetraders-sdk";
import { SystemsApi } from "./spacetraders-sdk";

export const api = writable<ApiWrapper>();

interface ApiWrapper {
    agents: AgentsApi,
    contracts: ContractsApi,
    default: DefaultApi,
    factions: FactionsApi,
    fleet: FleetApi,
    systems: SystemsApi,
}

export function setApiKey(apiKey: string) {
    const configuration = new Configuration({
        accessToken: apiKey
    });
    api.set({
        agents: new AgentsApi(configuration),
        contracts: new ContractsApi(configuration),
        default: new DefaultApi(configuration),
        factions: new FactionsApi(configuration),
        fleet: new FleetApi(configuration),
        systems: new SystemsApi(configuration),
    });
}
