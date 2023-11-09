import type { Object3D } from "three";
import ContextmenuComponent from "./components/ContextmenuComponent.svelte";
import type { Ship, Shipyard } from "./api-sdk";

type CtxElement = {
    label: string,
    onClick: () => void
}
export class Contextmenu {
    contextmenu: ContextmenuComponent;

    constructor(target: MouseEvent | HTMLElement | Object3D) {
        this.contextmenu = new ContextmenuComponent({
            target: document.body,
        })

        const element = this.contextmenu.container;
        if (target instanceof HTMLElement) {
            element.style.left = target.offsetLeft.toString()
            element.style.top = target.offsetTop.toString()
        } else if (target instanceof MouseEvent) {
            target.preventDefault()
            const tar = target.target as HTMLElement
            element.style.left = `${tar.offsetLeft}px`;
            element.style.top = `${tar.offsetTop}px`;
        } else {
            // TODO: Object3D
        }

        this.contextmenu.$on("mouseleave", () => {
            this.contextmenu.$destroy();
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
}