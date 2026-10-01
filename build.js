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
  
  // Create Vercel output directory 'public'
  const fs = require('fs');
  const path = require('path');
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy index.html to public/index.html
  fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(publicDir, 'index.html'));

  // Copy static directory to public/static
  const publicStaticDir = path.join(publicDir, 'static');
  if (fs.cpSync) {
    fs.cpSync(path.join(__dirname, 'static'), publicStaticDir, { recursive: true });
  } else {
    copyFolderRecursiveSync(path.join(__dirname, 'static'), publicDir);
  }

  console.log('Public output directory created successfully for Vercel deployment.');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

function copyFolderRecursiveSync(source, target) {
  const fs = require('fs');
  const path = require('path');
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file));
      }
    });
  }
}

