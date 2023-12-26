const perfilModel = require('../models/perfil.model');
const PdfModelMongo = require('../models/models_mongo/pdf.model');
const FotoModelMongo = require('../models/models_mongo/foto.model')
const { response } = require('../helpers/response.helper');

const obtener_perfil = async (req, res) => {

    try {

        let datosUsuario = {};
        
        let results = await perfilModel.obtenerPerfil(req.params);

        if(results.records.length == 0) return response(res, 400, 'Usuario no existe.', []); 

        // datos de usuario
        datosUsuario = results.records[0]._fields[0].properties;
        delete datosUsuario.password;

        // obteniendo y asignando foto de doctor
        const resultMongo = await FotoModelMongo.findOne({ id_doctor: datosUsuario.id_doctor }); // buscamos solo uno
        datosUsuario.foto = resultMongo.foto;

        // obteniendo pdfs de doctor
        const resultMongoPdf = await PdfModelMongo.find({ id_doctor: datosUsuario.id_doctor }) // buscamos todos
                                                    .select('nombre pdf'); // campos a mostrar
        
        // asignamos docs a los datos de usuario
        datosUsuario.docs = resultMongoPdf;                                            

        response(res, 200, 'Datos de perfil obtenidos con exito.', [datosUsuario]);   

    } catch (error) {
        return response(res, 400, 'Error al obtener datos de perfil.', [error]);
    }

}

const actualizar_perfil = async (req, res) => {

    try {

        await perfilModel.actualizarPerfil(req.body);

        response(res, 200, 'Datos de perfil actualizados con exito.', []);  
        
    } catch (error) {
        return response(res, 400, 'Error al actualizar datos de perfil.', [error]);
    }

}

module.exports = { obtener_perfil, actualizar_perfil };