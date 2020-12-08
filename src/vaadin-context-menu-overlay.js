/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import '@polymer/polymer/lib/elements/dom-module.js';

import { OverlayElement } from '@vaadin/vaadin-overlay/src/vaadin-overlay.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="vaadin-context-menu-overlay-styles" theme-for="vaadin-context-menu-overlay">
  <template>
    <style>
      :host {
        align-items: flex-start;
        justify-content: flex-start;
      }

      :host([right-aligned]),
      :host([end-aligned]) {
        align-items: flex-end;
      }

      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      [part="overlay"] {
        background-color: #fff;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * The overlay element.
 *
 * ### Styling
 *
 * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/src/vaadin-overlay.html)
 * for `<vaadin-context-menu-overlay>` parts.
 *
 * #### Deprecated
 * `right-aligned` is deprecated in favor of `end-aligned`
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends PolymerElement
 * @private
 */
class ContextMenuOverlayElement extends OverlayElement {
  static get is() {
    return 'vaadin-context-menu-overlay';
  }

  static get properties() {
    return {
      instanceProps: {
        type: Object,
        value: () => {
          return {
            detail: true,
            target: true
          };
        }
      },

      /**
       * @protected
       */
      parentOverlay: {
        type: Object,
        readOnly: true
      }
    };
  }

  static get observers() {
    return ['_themeChanged(theme)'];
  }

  ready() {
    super.ready();

    this.addEventListener('keydown', e => {
      if (!e.defaultPrevented && e.composedPath()[0] === this.$.overlay && [38, 40].indexOf(e.keyCode) > -1) {
        const child = this.getFirstChild();
        if (child && Array.isArray(child.items) && child.items.length) {
          e.preventDefault();
          if (e.keyCode === 38) {
            child.items[child.items.length - 1].focus();
          } else {
            child.focus();
          }
        }
      }
    });
  }

  getFirstChild() {
    return this.content.querySelector(':not(style):not(slot)');
  }

  _themeChanged(theme) {
    this.close();
  }

  getBoundaries() {
    // Measure actual overlay and content sizes
    const overlayRect = this.getBoundingClientRect();
    const contentRect = this.$.overlay.getBoundingClientRect();

    // Maximum x and y values are imposed by content size and overlay limits.
    let yMax = overlayRect.bottom - contentRect.height;

    // Adjust constraints to ensure bottom-aligned applies to sub-menu.
    const parent = this.parentOverlay;
    if (parent && parent.hasAttribute('bottom-aligned')) {
      const parentStyle = getComputedStyle(parent);
      yMax = yMax - parseFloat(parentStyle.bottom) - parseFloat(parentStyle.height);
    }

    return {
      xMax: overlayRect.right - contentRect.width,
      xMin: overlayRect.left + contentRect.width,
      yMax,
      left: overlayRect.left,
      right: overlayRect.right,
      top: overlayRect.top,
      width: contentRect.width
    };
  }
}

customElements.define(ContextMenuOverlayElement.is, ContextMenuOverlayElement);
