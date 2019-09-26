const path = require('path');
const fs = require('fs');

const eslint = require('eslint');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // do something to config
    if (target === 'web' && dev) {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              enforce: 'pre',
              include: resolveApp('./src'),
              use: [
                {
                  options: {
                    // cache: true,
                    formatter: eslintFormatter,
                    // eslintPath: require.resolve('eslint'),
                    // resolvePluginsRelativeTo: __dirname,
                  },
                  loader: 'eslint-loader',
                },
              ],
            },
            ...config.module.rules
          ]
        }
      };
    }
    return config
  },
};