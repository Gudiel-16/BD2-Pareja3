const chatModel = require('../models/chat.model');
const { response } = require('../helpers/response.helper');

const guardar_mensaje = async (req, res) => {
    try {

        await chatModel.guardarMensaje(req.body);

        response(res, 200, 'Mensaje guardado con exito.', []);   

    } catch (error) {
        return response(res, 400, 'Error al guardar mensaje.', [error]);
    }
};

const obtener_mensajes = async (req, res) => {
    try {

        let results = await chatModel.obtenerMensajes(req.body);
        let mensajes = [];

        if(results.records.length > 0) {
            let mensajes_array = results.records[0]._fields[0].properties.mensajes;
            mensajes_array.forEach((element) => {
                let partes = element.split("___"); // es el separador entre el id, fecha y mensaje
                mensajes.push({id_doctor: partes[0], fecha: partes[1], mensaje: partes[2]});                
            });
        }

        response(res, 200, 'Mensajes obtenidos con exito.', mensajes);   

    } catch (error) {
        return response(res, 400, 'Error al obtener mensajes.', [error]);
    }
};

module.exports = { guardar_mensaje, obtener_mensajes };