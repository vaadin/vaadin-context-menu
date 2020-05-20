module.exports = {
  files: [
    'package.json',
    'vaadin-context-menu.js',
    'src/vaadin-context-menu.js',
    'src/vaadin-contextmenu-items-mixin.js'
  ],
  from: [
    '"resolutions": {',
    /import '\.\/theme\/lumo\/vaadin-(.+)\.js';/,
    '@mixes Vaadin.ContextMenu.',
    /@memberof Vaadin\n.*@extends Vaadin\./g,
  ],
  to: [
    '"resolutions": {\n  "@webcomponents/webcomponentsjs": "2.2.0",',
    `import './theme/lumo/vaadin-$1.js';\nexport * from './src/vaadin-$1.js';`,
    '@mixes ',
    '@extends '
  ]
};
