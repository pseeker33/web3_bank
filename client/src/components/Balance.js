import React, { useEffect, useState } from "react";

const Balance = ({ contract }) => {
  const [balance, setBalance] = useState(0); // Estado para almacenar el saldo

  useEffect(() => {
    if (contract) {
      const fetchBalance = async () => {
        try {
          // Obtener el saldo del usuario conectado desde el contrato
          const userBalance = await contract.getBalance();
          setBalance(userBalance.toString()); // Establecer el saldo
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };

      fetchBalance();
    }
  }, [contract]); // Vuelve a ejecutar si el contrato cambia

  return (
    <div>
      <h3>Your Balance:</h3>
      <p>{balance} ETH</p>
    </div>
  );
};

export default Balance;
