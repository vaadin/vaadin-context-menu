const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="not-animated-context-menu-overlay" theme-for="vaadin-context-menu-overlay">
  <template>
    <style include="lumo-context-menu-overlay">
      :host([opening]),
      :host([closing]),
      :host([opening]) [part="overlay"],
      :host([closing]) [part="overlay"] {
        animation: none !important;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
