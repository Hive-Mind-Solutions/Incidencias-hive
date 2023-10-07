// CreateTicketButton.jsx
import React, { useState } from "react";

function CreateTicketButton({ onClick }) {
  const [isButtonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setButtonVisible(false); // Oculta el botón al hacer clic
    onClick(); // Llama a la función onClick pasada como prop para mostrar el formulario
  };

  return (
    isButtonVisible && (
      <button className="create-ticket-button" onClick={handleClick}>
        <span className="plus">+</span>
        <span className="text">Crear Ticket</span>
      </button>
    )
  );
}

export default CreateTicketButton;
