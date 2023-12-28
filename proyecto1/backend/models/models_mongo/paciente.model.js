const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({

    idPaciente: {
        type: String, // tipo
        required: true // obligatorio
    },
    edad: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
});

module.exports = model( 'Paciente', PacienteSchema );