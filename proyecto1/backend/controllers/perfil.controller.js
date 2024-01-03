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

const actualizar_foto = async (req, res) => {

    try {

        const { id_doctor, foto } = req.body;

        const fotoUsuario = await FotoModelMongo.findOne({ id_doctor: id_doctor });

        // si aun no hay usuario, aun no tiene foto
        if(!fotoUsuario){
            let foto_mongo = new FotoModelMongo({ id_doctor: id_doctor, foto: foto });
    
            // guardando foto en mongo
            await foto_mongo.save();

            return response(res, 200, 'Foto actualizada con exito.', []);  
        }

        // solo actualizamos
        await FotoModelMongo.findOneAndUpdate({id_doctor: id_doctor}, { foto: foto }, {new: true});
        
        response(res, 200, 'Foto actualizada con exito.', []);  
        
    } catch (error) {
        return response(res, 400, 'Error al actualizar foto.', [error]);
    }

}

module.exports = { obtener_perfil, actualizar_perfil, actualizar_foto };