import React from "react";
import HomeMenuButton from "./HomeMenuButton";
import { Row } from "antd";

function HomeMenu() {
  // Objeto ficticio de ejemplo
  const menuItems = [
    { id: 1, text: "Función 1", route: "/funcion1" },
    { id: 2, text: "Función 2", route: "/funcion2" },
  ];

  return (
    <Row align="middle" justify="center" className="login-container">
      {menuItems.map((item) => (
        <HomeMenuButton
          key={item.id}
          text={item.text}
          onClick={() => {
            // Aquí puedes manejar la navegación a la ruta correspondiente
            console.log(`Navegando a ${item.route}`);
          }}
        />
      ))}
    </Row>
  );
}

export default HomeMenu;
