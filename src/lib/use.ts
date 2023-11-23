import type { InteractMenuContent } from "./components/common/InteractMenu.svelte";
import InteractMenu from "./components/common/InteractMenu.svelte";

export function tooltip(node: Node, content: InteractMenuContent) {
  const target = node as HTMLElement;
  const component = new InteractMenu({
    target: document.body,
    props: {
       content,
       anchor: target
    }        
  });
  target.addEventListener("mouseenter", component.show)
  target.addEventListener("mouseleave", component.hide)

  return {
    destroy() {
      target.removeEventListener("mouseenter", component.show)
      target.removeEventListener("mouseleave", component.hide)
    }
  }
}

export function dropdown(node: Node, content: InteractMenuContent) {
  const target = node as HTMLElement;
  const component = new InteractMenu({
    target: document.body,
    props: {
       content,
       anchor: target
    }
  });

  target.addEventListener("mouseenter", component.show)
  component.$on("mouseleave", component.hide)
  return {
    destroy() {
      target.removeEventListener("mouseenter", component.show)
    }
  }
}