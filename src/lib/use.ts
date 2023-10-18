import type { ComponentType } from "svelte"
import Tooltip from "./components/Tooltip.svelte";

export function tooltip(node: Node, content: string | {component: ComponentType, props: any}) {
    let tooltip: Tooltip | null;

    function mouseEnter(e: Event) {
        if (!e.target) {
            return
        }
        const element = e.target as HTMLElement;
        tooltip = new Tooltip({
            target: document.body,
            props: {
                content: content,
                anchorTo: element
            }
        })
    }
    function mouseLeave(e: Event) {
        tooltip?.$destroy();
    }

    node.addEventListener("mouseenter", mouseEnter);
    node.addEventListener("mouseleave", mouseLeave);
    return {
        destroy() {
            node.removeEventListener("mouseenter", mouseEnter);
            node.removeEventListener("mouseleave", mouseLeave);
        }
    }
}