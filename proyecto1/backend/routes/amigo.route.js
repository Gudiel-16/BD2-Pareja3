const express = require('express');
const router = express.Router();

const {
    agregar_amigo,
    mis_amigos
} = require('../controllers/amigo.controller');

router.route('/amigos/agregar').post(agregar_amigo);
router.route('/amigos/:id_doctor').get(mis_amigos);

module.exports = router;