
// subscribebanner/subscribe.routes.js
const express = require("express");
const { subscribeUser } = require("./subscribe.controller");

const router = express.Router();

// Ruta para manejar suscripciones
router.post("/subscribe", subscribeUser);

module.exports = router;
