/* eslint-disable */
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('solidity-coverage');
require('@nomiclabs/hardhat-etherscan');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
/*eslint no-undefined: "error"*/
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './packages/client/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 3,
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/0f9683418f3d46a6b4904bee7eea9f7c',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  contractSizer: {
    runOnCompile: true,
  },
  etherscan: {
    apiKey: {
      ropsten: process.env.ETHERSCAN_API_KEY,
    },
  },
};
