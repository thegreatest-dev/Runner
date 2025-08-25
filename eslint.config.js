// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: ['react-hooks'],
    rules: {
      // Enforce the Rules of Hooks
      'react-hooks/rules-of-hooks': 'error',
      // Verify effect dependencies
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
