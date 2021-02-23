module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|md|mdx)'],
  addons: [
    '@storybook/addon-links',
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
  ],
  typescript: { check: true },
  babel: (options) => {
    options.plugins.push(require.resolve('babel-plugin-styled-components'));
    return options;
  },
};
