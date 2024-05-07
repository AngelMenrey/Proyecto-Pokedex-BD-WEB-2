import React, { useState, useEffect } from "react";
import ButtonSignIn from "../components/buttonSignIn";
import "./login.css";

interface PokemonType {
  _id: number;
  typepokemon: string;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsLoggedIn(true);
      setToken(token);
      getPokemonTypes(token);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor ingresa correo y contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error: Correo o contraseña incorrectos"
        );
      }

      const data = await response.json();
      const userName = data.user.name;
      const storedUser = localStorage.getItem("user");
      if (storedUser === userName) {
        alert("¡Ya estás logueado!");
      } else {
        localStorage.setItem("user", userName);
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert(`¡Bienvenido, ${userName}!`);
        getPokemonTypes(data.token);
      }
    } catch (error: any) {
      alert(error.message || "Error: Correo o contraseña incorrectos");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const getPokemonTypes = async (token: string) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/typespokemons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los tipos de Pokémon");
      }
      const data = await response.json();
      setPokemonTypes(data);
    } catch (error) {
      console.error(error);
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
      {isLoggedIn && (
        <div>
          <h2>Tipos de Pokémon</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {pokemonTypes.map((type) => (
                <tr key={type._id}>
                  <td>{type._id}</td>
                  <td>{type.typepokemon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Login;
