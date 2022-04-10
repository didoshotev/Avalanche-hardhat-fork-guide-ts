import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

// import "@nomiclabs/hardhat-ethers";
// import "hardhat-deploy-ethers";
import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";
dotenv.config();

const AVALANCHE_MAINNET_URL = process.env.AVALANCHE_MAINNET_URL;

console.log(process.env.INFURA_ID);
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 43114,
      gasPrice: 225000000000,
      throwOnTransactionFailures: false,
      loggingEnabled: true,
      forking: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        enabled: true,
        blockNumber: 2975762
      },
    },
    rinkeby: {
      chainId: 4,
      gasPrice: 225000000000,
      throwOnTransactionFailures: false,
      loggingEnabled: true,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}` //fix env if needed
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;