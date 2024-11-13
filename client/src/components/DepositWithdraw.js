import { useState } from "react";
import { parseEther } from "ethers";

const DepositWithdraw = ({ contract }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      await contract.deposit({ value: parseEther(depositAmount) });
      alert("Deposit successful!");
    } catch (error) {
      console.error("Deposit failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await contract.withdraw(parseEther(withdrawAmount));
      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Withdrawal failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Amount to deposit"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit} disabled={loading}>
          {loading ? "Depositing..." : "Deposit"}
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount to withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw} disabled={loading}>
          {loading ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>
    </div>
  );
};

export default DepositWithdraw;
