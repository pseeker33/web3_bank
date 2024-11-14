//require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig 
 module.exports = {
  solidity: "0.8.27",
  };
  */
 //require('@nomiclabs/hardhat-ethers');
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 31337  // El ID de cadena para la red local de Hardhat
    }
    /* sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`]
    }, 
    localhost: {
      url: "http://127.0.0.1:8545",  // Dirección del nodo local de Hardhat
      accounts: [process.env.PRIVATE_KEY]  // Asegúrate de tener una variable de entorno PRIVATE_KEY si la quieres usar
    } */
  }
};