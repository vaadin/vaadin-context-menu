import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/mixins/menu-overlay.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="lumo-context-menu-overlay" theme-for="vaadin-context-menu-overlay">
  <template>
    <style include="lumo-menu-overlay">
      :host([phone]) {
        top: 0 !important;
        right: 0 !important;
        bottom: var(--vaadin-overlay-viewport-bottom) !important;
        left: 0 !important;
        align-items: stretch;
        justify-content: flex-end;
      }

    /* TODO These style overrides should not be needed.
       We should instead offer a way to have non-selectable items inside the context menu. */

      :host {
        --_lumo-list-box-item-selected-icon-display: none;
        --_lumo-list-box-item-padding-left: calc(var(--lumo-space-m) + var(--lumo-border-radius) / 4);
      }

      [part="overlay"] {
        outline: none;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-context-menu-list-box" theme-for="vaadin-context-menu-list-box">
  <template>
    <style>
      :host(.vaadin-menu-list-box) {
        --_lumo-list-box-item-selected-icon-display: block;
      }

      /* Normal item */

      [part="items"] ::slotted(.vaadin-menu-item) {
        -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
        cursor: default;
      }

      [part="items"] ::slotted(.vaadin-menu-item) {
        outline: none;
        border-radius: var(--lumo-border-radius);
        padding-left: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius) / 4));
        padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius) / 4);
      }

      :host(.vaadin-menu-list-box) [part="items"] ::slotted(.vaadin-menu-item) {
        padding-left: calc(var(--lumo-border-radius) / 4);
        padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius) / 4);
      }

      /* Workaround to display checkmark in IE11 when list-box is not used in dropdown-menu */
      [part="items"] ::slotted(.vaadin-menu-item)::before {
        display: var(--_lumo-item-selected-icon-display);
      }

      /* Hovered item */
      /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */

      [part="items"] ::slotted(.vaadin-menu-item:hover:not([disabled])),
      [part="items"] ::slotted(.vaadin-menu-item[expanded]:not([disabled])) {
        background-color: var(--lumo-primary-color-10pct);
      }

      /* RTL styles */
      :host([dir="rtl"])[part="items"] ::slotted(.vaadin-menu-item) {
        padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius) / 4);
        padding-right: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius) / 4));
      }

      :host([dir="rtl"].vaadin-menu-list-box) [part="items"] ::slotted(.vaadin-menu-item) {
        padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius) / 4);
        padding-right: calc(var(--lumo-border-radius) / 4);
      }

      /* Focused item */

      @media (pointer: coarse) {
        [part="items"] ::slotted(.vaadin-menu-item:hover:not([expanded]):not([disabled])) {
          background-color: transparent;
        }
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-context-menu-item" theme-for="vaadin-context-menu-item">
  <template>
    <style>
      :host {
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
      }

      :host(.vaadin-menu-item[menu-item-checked])::before {
        opacity: 1;
      }

      :host(.vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        font-family: lumo-icons;
        font-size: var(--lumo-icon-size-xs);
        content: var(--lumo-icons-angle-right);
        color: var(--lumo-tertiary-text-color);
      }

      :host(:not([dir="rtl"]).vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        margin-right: calc(var(--lumo-space-m) * -1);
        padding-left: var(--lumo-space-m);
      }

      :host([expanded]) {
        background-color: var(--lumo-primary-color-10pct);
      }

      /* RTL styles */
      :host([dir="rtl"].vaadin-menu-item.vaadin-context-menu-parent-item)::after {
        content: var(--lumo-icons-angle-left);
        margin-left: calc(var(--lumo-space-m) * -1);
        padding-right: var(--lumo-space-m);
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
