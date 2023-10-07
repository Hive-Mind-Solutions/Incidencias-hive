const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.use("/login", (req, res, next) => {
  console.log("Login request received:", req.body);
  next();
});

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser); // Nueva línea

module.exports = router;
