import { Object3D } from "three";
import ContextmenuComponent from "./components/ContextmenuComponent.svelte";
import { WaypointTrait, type Ship, type Shipyard, type Waypoint } from "./api-sdk";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer";
import ShipyardWindow from "./components/ShipyardWindow.svelte";
import { api } from "./api";

type CtxElement = {
    label: string,
    onClick: () => void
}
export class Contextmenu {
    contextmenu: ContextmenuComponent;

    css2dObject?: CSS2DObject

    constructor(target: MouseEvent | HTMLElement | Object3D) {
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

        this.contextmenu.$on("mouseleave", () => {
            this.contextmenu.$destroy();
            this.css2dObject?.removeFromParent()
        }); 
    }

    add(element: CtxElement) {
        const a = document.createElement("a")
        a.href = "#"
        a.innerText = element.label
        a.onclick = (e) => {
            e.stopPropagation()
            element.onClick()
        }
        this.contextmenu.buttons.append(a)
        this.contextmenu.buttons = this.contextmenu.buttons
    }
    
    createWaypointButtons(waypoint: Waypoint) {
        for (const trait of waypoint.traits) {
            switch (trait.symbol) {
                case (WaypointTrait.symbol.SHIPYARD):
                    this.add({
                        label: "Open Shipyard shop",
                        onClick: async () => {
                            const shipyard = (await api.systems.getShipyard(waypoint.systemSymbol, waypoint.symbol)).data;
                            new ShipyardWindow({target: document.body, props: {shipyard: shipyard}})
                        }
                    })
            }
        }
        this.add({
            label: "testing",
            onClick: () => {}
        })
    }
}