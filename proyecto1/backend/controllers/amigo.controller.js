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

const usuarios_que_no_son_mis_amigos = async (req, res) => {
    try {

        let amigos = [];
        let results= await amigoModel.usuariosQueNoSonMisAmigos(req.params);

        if(results.records.length > 0) {
            // iteramos para obtener datos de cada usuario
            results.records.forEach((element) => {
                let actual = element._fields[0].properties;
                delete actual.password; // eliminamos propiedad
                amigos.push(actual);
            });
        }

        response(res, 200, 'Usuarios que aun no son mis amigos obtenidos con exito.', amigos);   

    } catch (error) {
        return response(res, 400, 'Error al obtener usuarios que aun no son mis amigos.', [error]);
    }
};

const busqueda_por_nombre = async (req, res) => {
    try {

        let amigos = [];
        let results= await amigoModel.busquedaPorNombre(req.body);

        if(results.records.length > 0) {
            // iteramos para obtener datos de cada usuario
            results.records.forEach((element) => {
                let actual = element._fields[0].properties;
                delete actual.password; // eliminamos propiedad
                amigos.push(actual);
            });
        }

        response(res, 200, 'Búsqueda por nombre, obtenida con éxito.', amigos);   

    } catch (error) {
        return response(res, 400, 'Error al hacer búsqueda por nombre.', [error]);
    }
};

const amigos_de_amigos = async (req, res) => {
    try {

        let amigos = [];
        let results= await amigoModel.amigosDeAmigos(req.params);

        if(results.records.length > 0) {
            // iteramos para obtener datos de cada usuario
            results.records.forEach((element) => {
                let actual = element._fields[0].properties;
                delete actual.password; // eliminamos propiedad
                amigos.push(actual);
            });
        }

        response(res, 200, 'Búsqueda de amigos en común, obtenida con éxito.', amigos);   

    } catch (error) {
        return response(res, 400, 'Error al hacer búsqueda de amigos en común.', [error]);
    }
};

const busqueda_por_especialidad = async (req, res) => {
    try {

        let amigos = [];
        let results= await amigoModel.busquedaPorEspecialidad(req.body);

        if(results.records.length > 0) {
            // iteramos para obtener datos de cada usuario
            results.records.forEach((element) => {
                let actual = element._fields[0].properties;
                delete actual.password; // eliminamos propiedad
                amigos.push(actual);
            });
        }

        response(res, 200, 'Búsqueda por especialidad obtenida con éxito', amigos);   

    } catch (error) {
        return response(res, 400, 'Error al hacer búsqueda por especialidad.', [error]);
    }
};

module.exports = { agregar_amigo, mis_amigos, usuarios_que_no_son_mis_amigos, busqueda_por_nombre, amigos_de_amigos, busqueda_por_especialidad };
