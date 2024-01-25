import { api } from "./api";
import { ShipNavStatus, type Ship, ShipNavFlightMode, type SystemWaypoint, type Shipyard, ShipType, FactionSymbol } from "./api-sdk";
import { myAgent, notifications } from "./stores";

// refreshing on assignment doesn't work in .ts files, so just smash an update at everything
// Waiting for svelte 5 :)
function refresh() {
    myAgent.update(agent => agent);
}

//
// Ship related
//
export async function orbitShip(ship: Ship) {
    const res = await api.fleet.orbitShip({shipSymbol: ship.symbol});
    notifications.success(`Ship ${ship.symbol} succesfully sent to orbit`)
    ship = Object.assign(ship, res.data)
    refresh()
    return res.data
}
export async function dockShip(ship: Ship) {
    const res = await api.fleet.dockShip({shipSymbol: ship.symbol});
    notifications.success(`Ship ${ship.symbol} succesfully docked`)
    ship = Object.assign(ship, res.data)
    refresh()
    return res.data
}
export async function toggleShipOrbit(ship: Ship) {
    if (ship.nav.status == ShipNavStatus.DOCKED) {
        orbitShip(ship);
    } else {
        dockShip(ship)
    }
}
export async function extractResources(ship: Ship) {
    const res = await api.fleet.extractResources({shipSymbol: ship.symbol});
    notifications.success(`${res.data.extraction.yield.symbol} ${res.data.extraction.yield.units}`)
    ship = Object.assign(ship, {
        cargo: res.data.cargo,
        cooldown: res.data.cooldown
    })
    refresh()
    return res.data;
}
export async function refuelShip(ship: Ship) {
    const res = await api.fleet.refuelShip({shipSymbol: ship.symbol})
    ship.fuel = Object.assign(ship.fuel, res.data.fuel)
    notifications.success(`${ship.symbol} refueled`)
    myAgent.update(myAgent => Object.assign(myAgent, res.data.agent))
    return res.data
}
export async function pathShipNav(ship: Ship, mode: ShipNavFlightMode) {
    const res = await api.fleet.patchShipNav({
        shipSymbol: ship.symbol,
        requestBody: {
            flightMode: mode
        }
    });
    ship.nav = Object.assign(ship.nav, res.data)
    notifications.success(`${ship.symbol} flight mode set to ${mode}`)
    refresh()
    return res.data
}
export async function navigateShip(ship: Ship, toWaypoint: SystemWaypoint) {
    const res = await api.fleet.navigateShip({
        shipSymbol: ship.symbol,
        requestBody: {
            waypointSymbol: toWaypoint.symbol
        }
    })
    ship = Object.assign(ship, res.data)
    refresh()
    return res.data
}
export async function purchaseShip(shipyard: Shipyard, shipType: ShipType) {
    const res = await api.fleet.purchaseShip({requestBody: {
        waypointSymbol: shipyard.symbol,
        shipType
    }})
    myAgent.update(myAgent => {
        myAgent.ships.push(res.data.ship)
        return Object.assign(myAgent, res.data.agent);
    })
    notifications.success(`Succesfully bought ship ${shipType}`)
    return res.data;
}
export async function getMyShips() {
    const res = await api.getAll(api.fleet.getMyShips, api.fleet, {});
    return res
}

//
// System related
//
export async function getSystem(systemSymbol: string) {
    notifications.info("Starting to fetch system info...")
    const res = await api.systems.getSystem({systemSymbol});
    notifications.success("System info fetching done!")
    return res.data;
}
export async function getSystemWaypoints(systemSymbol: string) {
    const wps = await api.getAll(api.systems.getSystemWaypoints, api.systems, {systemSymbol})
    return wps
}

//
// Waypoint related
//
export async function getShipyard(systemSymbol: string, waypointSymbol: string) {
    const res = await api.systems.getShipyard({systemSymbol, waypointSymbol});
    return res.data;
}
export async function getMarket(systemSymbol: string, waypointSymbol: string) {
    const res = await api.systems.getMarket({systemSymbol, waypointSymbol});
    return res.data;
}

//
// Contract related
//
export async function getContracts() {
    const res = await api.getAll(api.contracts.getContracts, api.contracts, {});
    return res
}
export async function negotiateContract(shipSymbol: string) {
    const res = await api.fleet.negotiateContract({shipSymbol});
    return res.data;
}

//
// Agent related
//
export async function getMyAgent() {
    const res = await api.agents.getMyAgent();
    return res.data
}
export async function register(symbol: string, faction: FactionSymbol) {
    const res = await api.default.register({requestBody: {
        faction: faction,
        symbol
    }});
    return res.data
}