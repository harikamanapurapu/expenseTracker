import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail) {
      if (password === storedPassword) {
        navigate("/ViewExpenses");
      } else {
        alert("Invalid password.");
      }
    } else {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      navigate("/ViewExpenses");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Login Page</h2>
      <div className="mb-4">
        <label className="block font-bold mb-1">Email:</label>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Password:</label>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
