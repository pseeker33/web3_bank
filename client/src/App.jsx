import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import SimpleBankABI from "./SimpleBankABI.json"; // Importar el ABI del contrato
import ConnectWallet from "./components/ConnectWallet";
import Register from "./components/Register";
import DepositWithdraw from "./components/DepositWithdraw";
import Balance from "./components/Balance";
import WithdrawTreasury from "./components/WithdrawTreasury";
import './App.css';

const App = () => {
  const [account, setAccount] = useState(null);  // Estado para la cuenta conectada
  const [contract, setContract] = useState(null); // Estado para el contrato
  const [isOwner, setIsOwner] = useState(false);  // Estado para verificar si es el dueño
  const [isRegistered, setIsRegistered] = useState(false);  // Estado para verificar si el usuario está registrado
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  //const providerUrl = process.env.SEPOLIA_RPC_URL;

  // Detectar cambios en la cuenta de Metamask
  useEffect(() => {
    const checkUserStatus = async (simpleBank) => {
      if (!account) return;
      
      // Verificar si la cuenta es del owner
      const owner = await simpleBank.getOwner();
      setIsOwner(account.toLowerCase() === owner.toLowerCase());

      // Verificar si el usuario está registrado
      const userDetails = await simpleBank.userDetails(account);
      setIsRegistered(userDetails.registrado);
    };

    //if (account && contractAddress) {
    if (account) {
      console.log("Contract Address:", contractAddress);

      const provider = new BrowserProvider(window.ethereum);
      const simpleBank = new Contract(contractAddress, SimpleBankABI, provider);
      setContract(simpleBank);

      checkUserStatus(simpleBank);  // Verificar el estado del usuario
    }

    // Detectar cambios de cuenta
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });

    return () => {
      window.ethereum.removeListener("accountsChanged", () => {});
    };
  }, [account, contractAddress]);

  
  return (
    <div>
      {/* Si no hay cuenta conectada, mostrar el botón para conectarse */}
      {!account ? (
        <ConnectWallet setAccount={setAccount} />
      ) : (
        <>
          {/* Si es el owner, mostrar el dashboard del owner */}
          {isOwner ? (
            <>
              <h2>Owner Dashboard</h2>
              <WithdrawTreasury contract={contract} />
            </>
          ) : (
            <>
              {/* Si es un usuario no registrado, mostrar el formulario de registro */}
              {!isRegistered && <Register contract={contract} />}
              
              {/* Si el usuario está registrado, mostrar las opciones de saldo, depósito y retiro */}
              {isRegistered && <Balance contract={contract} />}
              {isRegistered && <DepositWithdraw contract={contract} />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;

