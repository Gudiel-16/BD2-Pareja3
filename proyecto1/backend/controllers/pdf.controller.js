const PdfModelMongo = require('../models/models_mongo/pdf.model');
const { response } = require('../helpers/response.helper');

const guardar_pdf = async (req, res) => {

    try {

        const { id_doctor, nombre, pdf } = req.body;

        // objeto schema de mongo
        let pdf_mongo = new PdfModelMongo({ id_doctor: id_doctor, nombre: nombre, pdf: pdf });

        // guardando pdf en mongo
        await pdf_mongo.save();

        response(res, 200, 'Pdf guardado con exito.', []);   

    } catch (error) {
        return response(res, 400, 'Error al guardar pdf.', [error]);
    }

}

module.exports = { guardar_pdf };