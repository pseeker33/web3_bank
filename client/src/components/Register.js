import { useState } from "react";

const Register = ({ contract }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const tx = await contract.registerUser(firstName, lastName); // Envía la transacción
      console.log("Transaction:", tx);
      await tx.wait(); // Espera a que la transacción se confirme
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed: " + (error.reason || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  /* const handleRegister = async () => {
    setLoading(true);
    try {
      await contract.registerUser(firstName, lastName);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };
 */
  return (
    <div className="register">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
