import { useEffect, useState } from "react";
import "../components/BackendConnectionExample.css";

interface PokemonType {
  _id: number;
  typepokemon: string;
}

export const BackendConnectionExample = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/v1/typespokemons/frontendconnectionexamplepokemontypes"
    )
      .then((response) => response.json())
      .then((responseData: PokemonType[]) => {
        setTypes(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h2>Tipos de Pokemones</h2>
        <table className="pokemon-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TIPO</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type._id}>
                <td>{type._id}</td>
                <td>{type.typepokemon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
