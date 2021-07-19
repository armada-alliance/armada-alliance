module.exports = {
  images: {
    domains: ["website.codespace1.sublayer.io", "website.sublayer.io", "armada-alliance.com"],
  },
  webpack: (config) => {
    const experiments = config.experiments || {};
    // config.experiments = { ...experiments, asyncWebAssembly: true };
    config.experiments = {
      ...experiments,
      // topLevelAwait: true,
      // importAsync: true,
      syncWebAssembly: true,
      // importAwait: true,
    };
    // config.output.assetModuleFilename = `static/[hash][ext]`;
    // config.output.publicPath = `/_next/`;
    // config.module.rules.push({
    //   test: /\.wasm/,
    //   type: 'asset/resource',
    // })
    return config
  },
};
