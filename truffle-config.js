const HDWalletProvider = require('@truffle/hdwallet-provider');
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
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          'transfer allow team giggle excuse bargain fury stock history market degree daughter',
          'https://palm-testnet.infura.io/v3/014a3ae7f9a84825a04d3e9bab71476f'
        ),
      network_id: 3,
      gas: '4500000',
      gasPrice: '10000000000',
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
