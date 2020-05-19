import { ContextMenuElement } from '../src/vaadin-context-menu.js';

export interface ContextMenuItem {
  text?: string,
  component?: string | HTMLElement,
  disabled?: boolean,
  checkable?: boolean,
  checked?: boolean,
  children?: ContextMenuItem[]
}

export type ContextMenuRenderer = (
  root: HTMLElement,
  owner?: ContextMenuElement,
  context?: {
    target: HTMLElement;
    detail?: object;
  }
) => void;
