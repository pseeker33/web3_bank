import { useState } from "react";
//import { ethers } from "ethers";

const ConnectWallet = ({ setAccount }) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
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
        <p className="loading">Loading...</p>
      ) : (
        <button className="button" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
