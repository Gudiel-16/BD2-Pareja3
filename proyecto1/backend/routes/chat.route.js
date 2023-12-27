const express = require('express');
const router = express.Router();

const {
    guardar_mensaje,
    obtener_mensajes
} = require('../controllers/chat.controller');

router.route('/chat').post(guardar_mensaje);
router.route('/chat/mensajes').post(obtener_mensajes);

module.exports = router;