const express = require('express');
const router = express.Router();

const {
    consulta_1,
    consulta_2,
    consulta_3,
    consulta_4,
    consulta_5
} = require('../controllers/consultas.controller');

router.route('/consultas/1').get(consulta_1);
router.route('/consultas/2').get(consulta_2);
router.route('/consultas/3').get(consulta_3);
router.route('/consultas/4').get(consulta_4);
router.route('/consultas/5').get(consulta_5);

module.exports = router;