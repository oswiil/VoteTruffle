const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      defaultEtherBalance: 500000,
      network_id: '*',
      websockets: true,
      chainId: 1337,
    },
  },
  compilers: {
    solc: {
      version: '0.7.1',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
