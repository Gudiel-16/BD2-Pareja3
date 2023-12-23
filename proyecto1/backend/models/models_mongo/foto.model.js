const { Schema, model } = require('mongoose');

const FotoSchema = Schema({

    id_doctor: {
        type: String, // tipo
        required: true // obligatorio
    },
    foto: {
        type: String,
        required: true,
    },
});

module.exports = model( 'Foto', FotoSchema ); // Foto: es nombre de como sera llamado