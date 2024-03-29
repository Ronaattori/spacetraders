/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityLevel } from './ActivityLevel';
import type { ShipEngine } from './ShipEngine';
import type { ShipFrame } from './ShipFrame';
import type { ShipModule } from './ShipModule';
import type { ShipMount } from './ShipMount';
import type { ShipReactor } from './ShipReactor';
import type { ShipType } from './ShipType';
import type { SupplyLevel } from './SupplyLevel';
export type ShipyardShip = {
    type: ShipType;
    name: string;
    description: string;
    supply: SupplyLevel;
    activity?: ActivityLevel;
    purchasePrice: number;
    frame: ShipFrame;
    reactor: ShipReactor;
    engine: ShipEngine;
    modules: Array<ShipModule>;
    mounts: Array<ShipMount>;
    crew: {
        required: number;
        capacity: number;
    };
};

