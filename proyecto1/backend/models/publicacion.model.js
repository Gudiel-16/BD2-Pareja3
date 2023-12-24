const createDriver = require('../database/config.neo4j');

const insertarPublicacion = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // guardar doctor
            const result = await session.run(
                'CREATE (p:Publicacion {id_doctor: $id_doctor, texto: $texto, fecha: $fecha}) RETURN p',
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

const obtenerPublicacionesPorIdDoctor = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // guardar doctor
            const result = await session.run(
                'MATCH (p:Publicacion {id_doctor: $id_doctor}) RETURN p',
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

module.exports = { insertarPublicacion, obtenerPublicacionesPorIdDoctor };
