import React, { useState } from "react";
import ButtonSignIn from "../components/buttonSignIn";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor ingresa correo y contraseña");
      return;
    }
    if (email === "angel@gmail.com" && password === "1234") {
      alert("¡Bienvenido!");
    } else {
      alert("Error: Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="off"
            title="Correo"
          />
          <label htmlFor="email">Correo Electrónico</label>
        </div>
        <div className="inputGroup">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="off"
            title="Contraseña"
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className="button-container">
          <ButtonSignIn />
        </div>
      </form>
    </div>
  );
}

export default Login;
