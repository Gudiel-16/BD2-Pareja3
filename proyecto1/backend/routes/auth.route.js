const express = require('express');
const router = express.Router();

const {
    iniciar_sesion,
    registrar_usuario
} = require('../controllers/auth.controller');

router.route('/auth/login').post(iniciar_sesion);
router.route('/auth/register').post(registrar_usuario);

module.exports = router;