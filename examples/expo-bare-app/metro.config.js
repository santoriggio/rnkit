const { getDefaultConfig } = require("expo/metro-config");

const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files within the mono repo (sanity check with no packages)
config.watchFolders = [workspaceRoot];

// Watch the local app folder, and the shared packages (uncomment if you have shared packages
// that are being used between the mono repo's apps)

const monorepoPackages = {
  "expo-helpers": path.resolve(workspaceRoot, "packages/expo-helpers"),
};
config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];

// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;
module.exports = config;
