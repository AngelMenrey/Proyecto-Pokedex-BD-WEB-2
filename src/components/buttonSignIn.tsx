import "./buttons.css";

function ButtonSignIn() {
  const handleClick = () => {
    const form = document.querySelector("form");
    if (form) {
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  return (
    <button className="button" title="Iniciar sesión" onClick={handleClick}>
      <span className="button-content">Iniciar sesión</span>
    </button>
  );
}

export default ButtonSignIn;
