require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    zkSyncEra: {
      url: process.env.ZKSYNC_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrumSepolia: {
      url: process.env.ARBITURM_SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};