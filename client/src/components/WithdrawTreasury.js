import React, { useState } from 'react';

const WithdrawTreasury = ({ contract }) => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    try {
      const tx = await contract.withdrawTreasury(amount);
      await tx.wait();  // Esperar a que la transacción se confirme
      alert("Retiro realizado con éxito");
    } catch (error) {
      alert(`Error en el retiro: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Retirar de la Tesorería</h3>
      <input
        type="number"
        placeholder="Monto a retirar en wei"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Retirar Tesorería</button>
    </div>
  );
};

export default WithdrawTreasury;
