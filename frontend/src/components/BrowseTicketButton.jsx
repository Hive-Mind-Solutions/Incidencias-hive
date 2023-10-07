// TicketBrowseButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

function BrowseTicketButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tickets"); // Navega a la página Tickets al hacer clic
  };

  return (
    <button className="create-ticket-button" onClick={handleClick}>
      <span className="plus">
        <EyeOutlined />
      </span>
      <span className="text">Ver incidencias</span>
    </button>
  );
}

export default BrowseTicketButton;
