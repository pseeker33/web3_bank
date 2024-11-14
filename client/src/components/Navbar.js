import React from "react";
import ConnectWallet from "./ConnectWallet";
import "../Navbar.css";

const Navbar = ({ account, isRegistered, setAccount }) => {
  const handleDisconnect = () => {
    setAccount(null);
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Bank App</div>
      <div className="navbar-links">Links</div>
      {account ? (
        isRegistered ? (
          <div className="profile-menu">
            <span>{account}</span>
            <button onClick={handleDisconnect}>Disconnect</button>
          </div>
        ) : (
          <></> // Aquí podrías agregar contenido específico para usuarios no registrados
        )
      ) : (
        <div>
          <ConnectWallet setAccount={setAccount} />
        </div>
        
        //<button className="wallet-btn">Connect Wallet</button>
      )}
    </div>
  );
};

export default Navbar;
