const esbuild = require('esbuild');

const externalGlobals = {
  name: 'external-globals',
  setup(build) {
    build.onResolve({ filter: /^(react|react-dom|react-dom\/client|three)$/ }, (args) => {
      return { path: args.path, namespace: 'external-global' };
    });
    build.onLoad({ filter: /.*/, namespace: 'external-global' }, (args) => {
      let exportCode = '';
      if (args.path === 'react') {
        exportCode = 'module.exports = window.React;';
      } else if (args.path === 'react-dom' || args.path === 'react-dom/client') {
        exportCode = 'module.exports = window.ReactDOM;';
      } else if (args.path === 'three') {
        exportCode = 'module.exports = window.THREE;';
      }
      return { contents: exportCode, loader: 'js' };
    });
  },
};

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'static/dist/digital_twin_bundle.js',
  format: 'iife',
  globalName: 'DigitalTwinApp',
  plugins: [externalGlobals],
  sourcemap: true,
  minify: false,
}).then(() => {
  console.log('Build succeeded: static/dist/digital_twin_bundle.js');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
