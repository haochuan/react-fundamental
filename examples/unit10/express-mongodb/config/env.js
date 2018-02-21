/**
 *
 * Environment Config
 *
 */

const env = {
  production: {
    name: 'production',
    port: 3000
  },
  dev: {
    name: 'dev',
    port: 3001
  },
  test: {
    name: 'test',
    port: 3002
  }
};

module.exports = env[process.env.NODE_ENV];
