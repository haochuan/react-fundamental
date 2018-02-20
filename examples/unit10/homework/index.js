const app = require('./app');
const env = require('./config/env');

const server = app.listen(env.port, () => {
  console.log(`${env.name} server is listening at port ${env.port}`);
});

module.exports = server;
