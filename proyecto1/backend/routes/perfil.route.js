const express = require('express');
const router = express.Router();

const {
    obtener_perfil,
    actualizar_perfil
} = require('../controllers/perfil.controller');

router.route('/doctor/:id_doctor').get(obtener_perfil);
router.route('/doctor').put(actualizar_perfil);

module.exports = router;