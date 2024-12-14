const express = require("express");
const { subscribeUser, getTotalSubscribers } = require("./subscribe.controller");

const router = express.Router();

// Ruta para manejar suscripciones
router.post("/subscribe", subscribeUser);

// Ruta para obtener el total de suscriptores
router.get("/total-subscribers", getTotalSubscribers);

module.exports = router;
