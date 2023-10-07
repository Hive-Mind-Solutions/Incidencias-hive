const { uploadToGCS } = require("../gcs");
const Ticket = require("../models/ticket");
const sendTicketEmail = require("../mailer");
const getNextSequence = require("./getNextSequence"); // Asumimos que esta función está definida en otro lugar de tu código

exports.createTicket = async (req, res) => {
  try {
    const {
      email,
      nombre,
      centro,
      aplicacion,
      tipo,
      criticidad,
      descripcion,
      fechaApertura,
    } = req.body;

    // Generación del número de ticket
    const ticketType = tipo === "consulta" ? "query" : "incident";
    const ticketNumber = await getNextSequence(ticketType);
    const numeroSolicitud = `${
      ticketType === "query" ? "QUHM" : "INHM"
    }${ticketNumber}`;

    // Subida de imágenes a GCS y obtención de sus URLs
    const imageUploadPromises = req.files.map(async (file) => {
      const fileName = `tickets/${Date.now()}-${file.originalname}`;
      const publicUrl = await uploadToGCS(file.buffer, fileName);
      return publicUrl;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    // Creación del ticket en la base de datos
    const newTicket = await Ticket.create({
      email,
      nombre,
      centro,
      aplicacion,
      tipo,
      criticidad,
      descripcion,
      fechaApertura,
      numeroSolicitud, // Asegúrate de que esto se añade al modelo y la base de datos
      imageUrls,
    });

    sendTicketEmail({
      email,
      nombre,
      centro,
      aplicacion,
      tipo,
      criticidad,
      descripcion,
      fechaApertura,
      numeroSolicitud, // Y también aquí, si es necesario para el email
      imageUrls,
    });

    res.status(201).json({
      status: "success",
      message: "Ticket created successfully",
      data: {
        ticket: newTicket,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the ticket",
    });
  }
};
