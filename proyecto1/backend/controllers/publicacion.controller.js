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

        let datos = {};
        let publicaciones = [];
        let resultado_final = [];

        let results = await publicacionModel.obtenerPublicacionesPorIdDoctor(req.params);

        if(results.records.length > 0) {

            // asignando los datos de doctor
            datos = results.records[0]._fields[0].properties;
            // eliminando propiedad password del objeto
            delete datos.password;

            // iterando para separar el texto de la publicacion con la fecha
            let pub = results.records[0]._fields[1].properties.pub;
            pub.forEach( (element) => {
                let partes = element.split("___"); // es el separador entre el texto y la fecha
                // texto: uno todo lo del array excepto el ultimo elemento, fecha: siempre sera el ultimo elemento
                publicaciones.push({texto: partes.slice(0, -1).join(''), fecha: partes[partes.length -1 ]});
            });

            datos.publicaciones = publicaciones;
            resultado_final.push(datos);
        }

        response(res, 200, 'Publicaciones de doctor obtenidas con éxito', resultado_final);

    } catch (error) {
        return response(res, 400, 'Error al obtener publicaciones.', [error]);
    }
};

const obtener_publicaciones_de_amigos = async (req, res) => {
    try {

        let resultado_final = [];

        let results = await publicacionModel.obtenerPublicacionesDeAmigos(req.params);

        if(results.records.length > 0) {

            // recorro los amigos
            results.records.forEach((element) => {

                // asignando los datos de doctor
                let datos_amigo = element._fields[0].properties;
                // eliminando propiedad password del objeto
                delete datos_amigo.password;

                // parte de las publicaciones
                let parte_publicaciones = element._fields[1][0].properties.pub;

                let publicaciones = [];

                // iterando para separar el texto de la publicacion con la fecha
                parte_publicaciones.forEach((element2) => {
                    let partes = element2.split("___"); // es el separador entre el texto y la fecha
                    // texto: uno todo lo del array excepto el ultimo elemento, fecha: siempre sera el ultimo elemento
                    publicaciones.push({texto: partes.slice(0, -1).join(''), fecha: partes[partes.length -1 ]});
                });
                
                // asigno publicaciones como propiedad
                datos_amigo.publicaciones = publicaciones;

                resultado_final.push(datos_amigo);
            });            
        }

        response(res, 200, 'Publicaciones de amigos obtenidas con éxito', resultado_final);

    } catch (error) {
        return response(res, 400, 'Error al obtener publicaciones de amigos.', [error]);
    }
};

module.exports = { insertar_publicacion, obtener_publicaciones_por_id_doctor, obtener_publicaciones_de_amigos };