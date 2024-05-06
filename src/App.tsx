import "./App.css";
import { BackendConnectionExample } from "./components/BackendConnectionExample";
import Login from "./forms/login";

function App() {
  return (
    <>
      {/* Este es el componente de login*/}

      {/*<Login />*/}

      {/* Este es el componente de ejemplo de la conexion del backend con front end */}

      <BackendConnectionExample />
    </>
  );
}

export default App;
