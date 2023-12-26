const amigoModel = require('../models/amigo.model');
const { response } = require('../helpers/response.helper');

const agregar_amigo = async (req, res) => {
    try {

        await amigoModel.agregarAmigo(req.body);

        response(res, 200, 'Amigo agregado con exito.', []);   

    } catch (error) {
        return response(res, 400, 'Error al agregar amigo.', [error]);
    }
};

const mis_amigos = async (req, res) => {
    try {

        let amigos = [];
        let results= await amigoModel.misAmigos(req.params);

        if(results.records.length > 0) {
            // iteramos para obtener datos de cada usuario
            results.records.forEach((element) => {
                let actual = element._fields[0].properties;
                delete actual.password; // eliminamos propiedad
                amigos.push(actual);
            });
        }

        response(res, 200, 'Amigos obtenidos con exito.', amigos);   

    } catch (error) {
        return response(res, 400, 'Error al obtener amigos.', [error]);
    }
};

module.exports = { agregar_amigo, mis_amigos };
