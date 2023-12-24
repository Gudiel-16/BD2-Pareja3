const publicacionModel = require('../models/publicacion.model');
const { response } = require('../helpers/response.helper');

const insertar_publicacion = async (req, res) => {
    try {

        await publicacionModel.insertarPublicacion(req.body);

        response(res, 200, 'Publicacion creada con exito.', []);   

    } catch (error) {
        return response(res, 400, 'Error al crear publicacion.', [error]);
    }
};

const obtener_publicaciones_por_id_doctor = async (req, res) => {
    try {

        let publicaciones = [];

        let results = await publicacionModel.obtenerPublicacionesPorIdDoctor(req.params);

        if(results.records.length > 0) {
            // iterando e insertando publicaciones en array
            results.records.forEach( (element) => {
                publicaciones.push(element._fields[0].properties)
            });
        }

        response(res, 200, 'Publicaciones de doctor obtenidas con éxito', publicaciones);

    } catch (error) {
        return response(res, 400, 'Error al obtener publicaciones.', [error]);
    }
};

module.exports = { insertar_publicacion, obtener_publicaciones_por_id_doctor };