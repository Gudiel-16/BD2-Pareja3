const { Schema, model } = require('mongoose');

const LogActividadSchema = Schema({

    timestamp: {
        type: String, // tipo
        required: true // obligatorio
    },
    actividad: {
        type: String,
        required: true,
    },
    idHabitacion: {
        type: Number,
        required: true,
    },
    idPaciente: {
        type: Number,
        required: true,
    },
});

module.exports = model( 'logactividade', LogActividadSchema );