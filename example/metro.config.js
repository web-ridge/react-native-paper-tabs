const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = [
  '@expo/vector-icons',
  'expo-constants',
  ...Object.keys(pak.peerDependencies),
];

const denyList = modules.map(
  (m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
);
// console.log({ denyList });
const extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);

  return acc;
}, {});

// console.log({ extraNodeModules });
module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we blacklist them at the root, and alias them to the versions in example's node_modules
  resolver: {
    blacklistRE: blacklist(denyList),

    extraNodeModules,
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
