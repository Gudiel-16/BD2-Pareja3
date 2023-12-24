const express = require('express');
const router = express.Router();

const {
    insertar_publicacion,
    obtener_publicaciones_por_id_doctor
} = require('../controllers/publicacion.controller');

router.route('/publicacion').post(insertar_publicacion);
router.route('/publicacion/:id_doctor').get(obtener_publicaciones_por_id_doctor);

module.exports = router;