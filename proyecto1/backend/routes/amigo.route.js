const express = require('express');
const router = express.Router();

const {
    agregar_amigo,
    mis_amigos,
    usuarios_que_no_son_mis_amigos,
    busqueda_por_nombre,
    amigos_de_amigos,
    busqueda_por_especialidad
} = require('../controllers/amigo.controller');

router.route('/amigos/agregar').post(agregar_amigo);
router.route('/amigos/:id_doctor').get(mis_amigos);
router.route('/noamigos/:id_doctor').get(usuarios_que_no_son_mis_amigos);
router.route('/amigos/busquedapornombre').post(busqueda_por_nombre);
router.route('/amigos/encomun/:id_doctor').get(amigos_de_amigos);
router.route('/amigos/porespecialidad').post(busqueda_por_especialidad);

module.exports = router;