const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ticketRoutes = require("./routes/tickets");
const authRoutes = require("./routes/auth"); // Nueva línea: Importamos las rutas de autenticación
const corsMiddleware = require("./middleware/cors");

const app = express();

// Configurar body-parser para aceptar JSON con un tamaño de cuerpo máximo de, por ejemplo, 10MB.
app.use(bodyParser.json({ limit: "100mb" }));

// Configurar body-parser para analizar datos de formulario (urlencoded) con un tamaño de cuerpo máximo de, por ejemplo, 10MB.
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Conexión a MongoDB usando Mongoose
const dbUri =
  "mongodb+srv://hive-admin:CiKCOi4R3M3TK0lX@nodetest.mivzgwx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

// Uso del middleware CORS
app.use(corsMiddleware);

// Para interpretar el cuerpo JSON de las solicitudes entrantes
app.use(express.json());

// Uso de las rutas definidas
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/auth", authRoutes); // Nueva línea: Usamos las rutas de autenticación

// Inicia el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
