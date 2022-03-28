require('babel-register');
require('babel-polyfill');

var HDWalletProvider =require("@truffle/hdwallet-provider")
var mnemonic = "uncle entire salon snap engage essay present cry will improve buffalo rural"

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mumbai.chainstacklabs.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    emerald: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnet.emerald.oasis.dev`),
      network_id: 42261,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.13",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
