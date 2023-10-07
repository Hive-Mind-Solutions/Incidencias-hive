const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  try {
    console.log("Attempting to login user:", req.body.email);
    const { email, password } = req.body;

    // Validar que se recibieron email y password
    if (!email || !password) {
      return res.status(400).send("Email y Password son requeridos");
    }

    // Buscar al usuario por email
    const user = await User.findOne({ email });

    // Validar que el usuario existe y que la contraseña es correcta
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).send("Email o Password incorrectos");
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NjY4MTM5OCwiaWF0IjoxNjk2NjgxMzk4fQ.OkhxSoipAcsJHyMuw9ktBGhMD_pYziO7VeCZO5n4FO8",
      { expiresIn: "1h" }
    );

    // Enviar respuesta
    res.status(200).json({ token, user: { email, userType } });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

//  función para registrar usuarios
exports.registerUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Validar que se recibieron email y password
    if (!email || !password || !userType) {
      return res.status(400).send("Email y Password son requeridos");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const user = new User({
      email,
      password: hashedPassword,
      userType,
    });
    await user.save();

    // Enviar una respuesta exitosa
    res.status(201).send("Usuario registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el usuario");
  }
};
