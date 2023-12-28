const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const authModel = require('../models/auth.model');
const { response } = require('../helpers/response.helper');
const FotoModelMongo = require('../models/models_mongo/foto.model')

const iniciar_sesion = async (req, res) => {
    try {
        console.log(req.body);
        const { password } = req.body;
        let results =  await authModel.iniciarSesion(req.body);

        // correo no existe
        if(results.records.length == 0) return response(res, 400, 'Correo o password incorrectos.', []);

        let datosUsuario = results.records[0]._fields[0].properties;

        // validar password
        const validarPassword = bcrypt.compareSync( password, datosUsuario.password );
        if ( !validarPassword ) return response(res, 400, 'Correo o password incorrectos.', []);
        
        // obteniendo y asignando foto de doctor
        const resultMongo = await FotoModelMongo.findOne({ id_doctor: datosUsuario.id_doctor });
        datosUsuario.foto = resultMongo.foto;

        response(res, 200, 'Inicio de sesion exitoso.', [datosUsuario]);   

    } catch (error) {
        return response(res, 400, 'Error al iniciar sesion.', [error]);
    }
};

const registrar_usuario = async (req, res) => {
    try {
        
        const { password, foto } = req.body;
        
        // creando id
        req.body.id_doctor = v4();

        // encriptar password
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(password, salt);

        // asignando sitio web vacio
        req.body.sitio_web = "";

        // guardando usuario en neo4j
        await authModel.registrarUsuario(req.body);

        // objeto schema de mongo
        let foto_mongo = new FotoModelMongo({ id_doctor: req.body.id_doctor, foto: foto });

        // guardando foto en mongo
        await foto_mongo.save();

        response(res, 200, 'Usuario registrado con exito', []);


    } catch (error) {
        return response(res, 400, 'Error al regitrar usuario, pueda que el correo ya este registrado', [error]);
    }
};

module.exports = { iniciar_sesion, registrar_usuario };