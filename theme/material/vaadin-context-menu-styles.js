import '@vaadin/vaadin-material-styles/font-icons.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/mixins/menu-overlay.js';
import '@vaadin/vaadin-material-styles/typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="material-context-menu-overlay" theme-for="vaadin-context-menu-overlay">
  <template>
    <style include="material-menu-overlay">
      [part="overlay"] {
        outline: none;
      }
    </style>
  </template>
</dom-module><dom-module id="material-context-menu-list-box" theme-for="vaadin-context-menu-list-box">
  <template>
    <style>
      /* ShadyCSS workaround */
      [part="items"] ::slotted(.vaadin-menu-item:not(hr))::before {
        display: block;
      }

      [part="items"] ::slotted(.vaadin-menu-item:not(hr)) {
        min-height: 36px;
        padding: 8px 32px 8px 10px;
        font-size: var(--material-small-font-size);
        line-height: 24px;
      }

      :host([dir="rtl"]) [part="items"] ::slotted(.vaadin-menu-item:not(hr)) {
        padding: 8px 10px 8px 32px;
      }

      [part="items"] ::slotted(.vaadin-menu-item:hover:not([disabled])) {
        background-color: var(--material-secondary-background-color);
      }

      [part="items"] ::slotted(.vaadin-menu-item[focused]:not([disabled])) {
        background-color: var(--material-divider-color);
      }

      @media (pointer: coarse) {
        [part="items"] ::slotted(.vaadin-menu-item:hover:not([disabled])),
        [part="items"] ::slotted(.vaadin-menu-item[focused]:not([disabled])) {
          background-color: transparent;
        }
      }
    </style>
  </template>
</dom-module><dom-module id="material-context-menu-item" theme-for="vaadin-context-menu-item">
  <template>
    <style>
      :host(.vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        font-family: material-icons;
        font-size: var(--material-icon-font-size);
      }

      :host(:not([dir="rtl"]).vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        content: var(--material-icons-chevron-right);
        padding-left: 9px;
        margin-right: -9px;
      }

      :host([dir="rtl"].vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        content: var(--material-icons-chevron-left);
        padding-right: 9px;
        margin-left: -9px;
      }

      :host(.vaadin-menu-item)::before {
        display: block;
      }

      :host(.vaadin-menu-item[menu-item-checked])::before {
        content: var(--material-icons-check);
      }

      :host([expanded]) {
        background-color: var(--material-secondary-background-color);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
