module.exports = {
  packagerConfig: {
    name: 'My Electron App',
    asar: true,
    osxSign: {},
    appCategoryType: 'public.app-category.developer-tools',
  },
  rebuildConfig: {
    force: true,
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/dmg-background.png',
        format: 'ULFO',
      },
    },
  ],
};
