const express = require('express');
const router = express.Router();

const {
    guardar_pdf
} = require('../controllers/pdf.controller');

router.route('/pdf').post(guardar_pdf);

module.exports = router;