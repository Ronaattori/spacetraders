import { Object3D } from "three";
import ContextmenuComponent from "./components/common/ContextmenuComponent.svelte";
import { WaypointTrait, type Ship, type Shipyard, type Waypoint } from "./api-sdk";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer";
import ShipyardWindow from "./components/spacetraders/window/ShipyardWindow.svelte";
import { api } from "./api";
import MarketplaceWindow from "./components/spacetraders/window/MarketplaceWindow.svelte";
import { windows } from "./stores";

type CtxElement = {
    label: string,
    onClick: () => void
}
export class Contextmenu {
    contextmenu: ContextmenuComponent;

    css2dObject?: CSS2DObject

    constructor(target: MouseEvent | HTMLElement | Object3D, buttons?: CtxElement[]) {
        let near: HTMLElement;
        if (target instanceof MouseEvent) {
            target.preventDefault()
            near = target.target as HTMLElement;            
        } else if (target instanceof HTMLElement) {
            near = target
        } else if (target instanceof Object3D) {
            this.css2dObject = new CSS2DObject();
            target.add(this.css2dObject)
            near = this.css2dObject.element
        } else {
            // I guess TypeScript requires a default, but this will never trigger :)
            near = document.createElement("div")
        }

        this.contextmenu = new ContextmenuComponent({
            target: (target instanceof Object3D) ? near : document.body,
        })
        if (!(target instanceof CSS2DObject)) {
            const container = this.contextmenu.container;
            container.style.left = near.offsetLeft.toString()
            container.style.top = near.offsetTop.toString()
        }
        
        // Add buttons if they were already provided
        buttons?.forEach(button => this.add(button));

        this.contextmenu.$on("mouseleave", () => {
            this.contextmenu.$destroy();
            this.css2dObject?.removeFromParent()
        }); 
    }

    add(element: CtxElement) {
        const onClick = (e: MouseEvent) => {
            e.stopPropagation()
            element.onClick()
        }
        this.contextmenu.add({label: element.label, onClick})
    }
    
    static createFromWaypoint(mesh: Object3D, waypoint: Waypoint) {
        const buttons: CtxElement[] = [];
        for (const trait of waypoint.traits) {
            switch (trait.symbol) {
                case (WaypointTrait.symbol.SHIPYARD):
                    buttons.push({
                        label: "Open Shipyard shop",
                        onClick: async () => {
                            const shipyard = (await api.systems.getShipyard(waypoint.systemSymbol, waypoint.symbol)).data;
                            windows.add("Shipyard", ShipyardWindow, {shipyard})
                        }
                    })
                    break;
                case (WaypointTrait.symbol.MARKETPLACE):
                    buttons.push({
                        label: "Open Marketplace shop",
                        onClick: async () => {
                            const marketplace = (await api.systems.getMarket(waypoint.systemSymbol, waypoint.symbol)).data;
                            windows.add("Marketplace", MarketplaceWindow, {marketplace})
                        }
                    })
                    break;
            }
        }
        if (buttons.length == 0) return;
        const ctx = new Contextmenu(mesh, buttons)
        return ctx;

    }
}