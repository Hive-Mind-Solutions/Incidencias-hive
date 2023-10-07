const cors = require("cors");

const corsMiddleware = cors({
  origin: "*", // o la URL de tu frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
});

module.exports = corsMiddleware;
