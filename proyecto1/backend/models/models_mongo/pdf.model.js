const { Schema, model } = require('mongoose');

const PdfSchema = Schema({

    id_doctor: {
        type: String, // tipo
        required: true // obligatorio
    },
    nombre: {
        type: String,
        required: true,
    },
    pdf: {
        type: String,
        required: true,
    },
});

PdfSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject(); // extraemos campos (_v, _id los quitamos para no retornar estos)
    return object;
});

module.exports = model( 'Pdf', PdfSchema ); // Pdf: es nombre de como sera llamado