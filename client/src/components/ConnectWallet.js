import { useState } from "react";
//import { ethers } from "ethers";

const ConnectWallet = ({ setAccount }) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;




/* import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = ({ onAccountChange }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        onAccountChange(accounts[0]); // Llama a la función que pasaremos como prop para manejar la cuenta
      } catch (error) {
        console.error("Error al conectar a Metamask", error);
      }
    } else {
      alert('Metamask no está instalado. Por favor instala Metamask y recarga la página.');
    }
  };

  return (
    <div>
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button onClick={connectWallet}>Conectar Metamask</button>
      )}
    </div>
  );
};

export default ConnectWallet;
 */