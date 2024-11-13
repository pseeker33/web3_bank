import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI } from '../contractABI';

function Dashboard() {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.VITE_CONTRACT_ADDRESS, contractABI, signer);

    try {
      const balance = await contract.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      alert('Error al obtener saldo');
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h2>Tu Saldo: {balance} ETH</h2>
      {/* Botones para depositar y retirar fondos */}
    </div>
  );
}

export default Dashboard;
