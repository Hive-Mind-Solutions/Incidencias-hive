import { useState } from "react";
import { Modal, Divider } from "antd";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const ModalDetails = ({ isVisible, details, onClose }) => {
  const [image, setImage] = useState();
  console.log(details);
  //cambio de formato de la fecha
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  const imageFinder = () => {
    for (let i of details.imagePaths) {
      console.log(i);
      setImage(i);
    }
  };

  return (
    <Modal
      title="Detalles del Ticket"
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        {/* Aquí puedes renderizar los detalles del ticket como desees */}
        <h3>
          Solicitud número:{" "}
          <span className="ticketNumber">{details.numeroSolicitud}</span>{" "}
        </h3>
        <strong>Fecha de apertura:</strong> {formatDate(details.createdAt)}
        <Divider />
        <p>
          <strong>Centro:</strong> {details.centro}
        </p>
        <p>
          <strong>Criticidad:</strong> {details.criticidad}
        </p>
        <p>
          <strong>Tipo de solicitud:</strong> {details.tipo}
        </p>
        <p>
          <strong>Descripción:</strong> {details.descripcion}
        </p>
        <p>
          <strong>Imágenes:</strong> {imageFinder(details.imagePaths)}
          <img src={image} alt="Imagen adjunta" />
        </p>
        <Divider />
        <p>
          <strong>Email del solicitante:</strong> {details.email}
        </p>
        <p>
          <strong>Nombre del solicitante:</strong> {details.nombre}
        </p>
      </div>
    </Modal>
  );
};

export default ModalDetails;
