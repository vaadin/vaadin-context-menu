import {ItemElement} from '@vaadin/vaadin-item/src/vaadin-item.js';

import {ListBoxElement} from '@vaadin/vaadin-list-box/src/vaadin-list-box.js';

/**
 * The vaadin-context-menu-item element.
 */
declare class ContextMenuItemElement extends ItemElement {
}

declare global {

  interface HTMLElementTagNameMap {
    "vaadin-context-menu-item": ContextMenuItemElement;
    "vaadin-context-menu-list-box": ContextMenuListBoxElement;
  }
}

/**
 * The vaadin-context-menu-list-box element.
 */
declare class ContextMenuListBoxElement extends ListBoxElement {
}

export {ItemsMixin};

declare function ItemsMixin<T extends new (...args: any[]) => {}>(base: T): T & ItemsMixinConstructor;

interface ItemsMixinConstructor {
  new(...args: any[]): ItemsMixin;
}

export {ItemsMixinConstructor};

interface ItemsMixin {
  readonly __isRTL: boolean;

  /**
   * Defines a (hierarchical) menu structure for the component.
   * If a menu item has a non-empty `children` set, a sub-menu with the child items is opened
   * next to the parent menu on mouseover, tap or a right arrow keypress.
   *
   * The items API can't be used together with a renderer or a template!
   *
   * #### Example
   *
   * ```javascript
   * contextMenu.items = [
   *   {text: 'Menu Item 1', children:
   *     [
   *       {text: 'Menu Item 1-1', checked: true},
   *       {text: 'Menu Item 1-2'}
   *     ]
   *   },
   *   {component: 'hr'},
   *   {text: 'Menu Item 2', children:
   *     [
   *       {text: 'Menu Item 2-1'},
   *       {text: 'Menu Item 2-2', disabled: true}
   *     ]
   *   },
   *   {text: 'Menu Item 3', disabled: true}
   * ];
   * ```
   */
  items: ContextMenuItem[]|undefined;

  __forwardFocus(): void;

  __itemsRenderer(root: HTMLElement, menu: ContextMenuElement, context: ContextMenuRendererContext): void;
}

import {ContextMenuItem} from '../@types/interfaces';

import {ContextMenuElement} from './vaadin-context-menu.js';

import {ContextMenuRendererContext} from '../@types/interfaces';
