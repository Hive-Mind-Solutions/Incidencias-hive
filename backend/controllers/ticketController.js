const { uploadToGCS } = require("../gcs");
const Ticket = require("../models/ticket");
const sendTicketEmail = require("../mailer");
const getNextSequence = require("./getNextSequence");

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

    const ticketType = tipo === "consulta" ? "query" : "incident";
    const ticketNumber = await getNextSequence(ticketType);
    const numeroSolicitud = `${
      ticketType === "query" ? "QUHM" : "INHM"
    }${ticketNumber}`;

    const imageUploadPromises = req.files.map(async (file) => {
      const fileName = `tickets/${Date.now()}-${file.originalname}`;
      const publicUrl = await uploadToGCS(file.buffer, fileName);
      return publicUrl;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const newTicket = await Ticket.create({
      email,
      nombre,
      centro,
      aplicacion,
      tipo,
      criticidad,
      descripcion,
      fechaApertura,
      numeroSolicitud,
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
      numeroSolicitud,
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

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      status: "success",
      results: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the tickets",
    });
  }
};
