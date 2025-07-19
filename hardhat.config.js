require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    zkSyncEraTestnet: {
      url: process.env.ZKSYNC_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonZkEvmTestnet: {
      url: process.env.PLYGON_ZKEVM_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
