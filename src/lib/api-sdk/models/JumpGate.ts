/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConnectedSystem } from './ConnectedSystem';

export type JumpGate = {
    /**
     * The maximum jump range of the gate.
     */
    jumpRange: number;
    /**
     * The symbol of the faction that owns the gate.
     */
    factionSymbol?: string;
    /**
     * The systems within range of the gate that have a corresponding gate.
     */
    connectedSystems: Array<ConnectedSystem>;
};

