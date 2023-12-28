const { Schema, model } = require('mongoose');

const HabitacionSchema = Schema({

    idHabitacion: {
        type: Number, // tipo
        required: true // obligatorio
    },
    habitacion: {
        type: String,
        required: true,
    },
});

module.exports = model( 'habitacione', HabitacionSchema );