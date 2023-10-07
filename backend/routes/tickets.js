// tickets.js

const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController"); // Asegúrate de que la ruta es correcta
const upload = require("../middleware/upload"); // Importa el middleware de multer

// Usar el controlador para la ruta POST
router.post("/", upload.array("files"), ticketController.createTicket);
router.get("/", ticketController.getAllTickets);

module.exports = router;
