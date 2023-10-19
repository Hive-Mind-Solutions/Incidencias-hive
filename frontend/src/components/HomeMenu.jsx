import React from "react";
import HomeMenuButton from "./HomeMenuButton";

function HomeMenu() {
  // Objeto ficticio de ejemplo
  const menuItems = [
    { id: 1, text: "Función 1", route: "/funcion1" },
    { id: 2, text: "Función 2", route: "/funcion2" },
    // ... otros ítems
  ];

  return (
    <div>
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
    </div>
  );
}

export default HomeMenu;
