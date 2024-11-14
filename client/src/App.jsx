import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import SimpleBankABI from "./SimpleBankABI.json"; // Importar el ABI del contrato
import ConnectWallet from "./components/ConnectWallet";
import Register from "./components/Register";
import DepositWithdraw from "./components/DepositWithdraw";
import Balance from "./components/Balance";
import WithdrawTreasury from "./components/WithdrawTreasury";
import Navbar from "./components/Navbar"; 
import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null); // Estado para la cuenta conectada
  const [contract, setContract] = useState(null); // Estado para el contrato
  const [isOwner, setIsOwner] = useState(false); // Estado para verificar si es el dueño
  const [isRegistered, setIsRegistered] = useState(false); // Estado para verificar si el usuario está registrado
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

    // Verificar si hay una cuenta conectada
    const initializeContract = async () => {
      if (!account) return;
      
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Asegura la conexión
      const signer = await provider.getSigner(); // Obtén el signer desde el provider
  
      // Crea una instancia del contrato usando el signer para permitir transacciones
      const simpleBank = new Contract(contractAddress, SimpleBankABI, signer);
      setContract(simpleBank);
  
      checkUserStatus(simpleBank); // Verificar el estado del usuario
    };
    
    initializeContract(); // Llama a la función async




/*       const provider = new BrowserProvider(window.ethereum);
      const signer = provider.getSigner(); // Obtener el signer de la cuenta conectada

      // Creamos una instancia del contrato con el PROVIDER PARA LECTURAS (como getOwner, userDetails)
      const simpleBankWithProvider = new Contract(contractAddress, SimpleBankABI, provider); 

      // Crea una nueva instancia del contrato con el SIGNER PARA ENVIAR TRANSACCIONES
      const simpleBankWithSigner = new Contract(contractAddress, SimpleBankABI, signer); 
      
      setContract(simpleBankWithSigner); // Almacenamos la instancia con el signer para las transacciones

      checkUserStatus(simpleBankWithProvider); // Usamos la instancia con provider para lecturas
 */

      /* // Crea una instancia del contrato usando el signer para permitir transacciones
      const simpleBank = new Contract(contractAddress, SimpleBankABI, signer);
      //const simpleBank = new Contract(contractAddress, SimpleBankABI, provider);
      setContract(simpleBank);

      checkUserStatus(simpleBank); // Verificar el estado del usuario */


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
      <Navbar account={account} isRegistered={isRegistered} setAccount={setAccount} />
      <div className="container">
        {/* Si no hay cuenta conectada, mostrar el botón para conectarse */}
        {!account ? (
          <div className="connect-wallet">
            <ConnectWallet setAccount={setAccount} />
          </div>
        ) : (
          <>
            {/* Muestra la dirección de la cuenta conectada */}
            <p className="connected-account">Connected account: {account}</p>{" "}

            {/* Si es el owner, mostrar el dashboard del owner */}
            {isOwner ? (
              <div className="owner-dashboard">
                <h2>Owner Dashboard</h2>
                <WithdrawTreasury contract={contract} />
              </div>
            ) : (
              <>
                {/* Si es un usuario no registrado, mostrar el formulario de registro */}
                {!isRegistered && (
                  <div className="form-wrapper">
                    <Register contract={contract} />
                  </div>
                )}
                {/* {!isRegistered && <Register contract={contract} />} */}


                {/* Si el usuario está registrado, mostrar las opciones de saldo, depósito y retiro */}
                {isRegistered && <Balance contract={contract} />}
                {isRegistered && <DepositWithdraw contract={contract} />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
