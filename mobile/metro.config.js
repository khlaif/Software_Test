const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

const repoRoot = path.resolve(__dirname, "..");

config.watchFolders = [repoRoot];

config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = config;