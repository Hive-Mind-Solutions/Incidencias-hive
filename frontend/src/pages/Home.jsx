import React, { useState } from "react";
import IntroText from "../components/IntroText";
import CreateTicketButton from "../components/CreateTicketButton";
import TicketForm from "../components/TicketForm";

function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleCreateTicketClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1>Registro de Incidencias</h1>
      <IntroText />
      <CreateTicketButton onClick={handleCreateTicketClick} />
      {showForm && <TicketForm />}
    </div>
  );
}

export default Home;
