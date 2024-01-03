const createDriver = require('../database/config.neo4j');

const registrarUsuario = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // verificando si ya existe correo
            const resultCorreo = await session.run(
                `MATCH (u:Usuario {correo: $correo}) RETURN u`,
                {correo: params.correo}
            );

            if(resultCorreo.records.length > 0) { reject("Correo existente"); return; };

            // guardar doctor
            const result = await session.run(
                'CREATE (u:Usuario {id_doctor: $id_doctor, nombre: $nombre, username: $username, correo: $correo, edad: $edad, especialidad: $especialidad, password: $password, sitio_web: $sitio_web}) RETURN u',
                params
            );

            resolve(result);

        } catch (error) {
            console.log(error);
            reject(error);

        } finally {
            if (session) {
                await session.close();
            }
        }
    });
};

const iniciarSesion = (params) => {
    return new Promise( async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // consulta
            const result = await session.run(
                `MATCH (u:Usuario {correo: $correo}) RETURN u`,
                {correo: params.correo}
            );

            resolve(result);

        } catch (error) {
            console.log(error);
            reject(error);

        } finally {
            if (session) {
                await session.close();
            }
        }
    });
};

module.exports = { registrarUsuario, iniciarSesion };