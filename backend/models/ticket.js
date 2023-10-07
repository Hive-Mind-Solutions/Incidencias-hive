// models/ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    centro: { type: String, required: true },
    aplicacion: { type: String, required: true },
    tipo: { type: String, required: true },
    criticidad: { type: String, required: true },
    descripcion: { type: String, required: true },
    numeroSolicitud: { type: String, required: true }, // Añadido este campo
    imagePaths: { type: [String], required: false }, // Para múltiples imágenes
  },
  { timestamps: true }
); // timestamps añadirá automáticamente createdAt y updatedAt

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
