const createDriver = require('../database/config.neo4j');

const obtenerPerfil = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (u:Usuario {id_doctor: $id_doctor}) RETURN u`;

            const result = await session.run(query, params);

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

const actualizarPerfil = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (u:Usuario {id_doctor: $id_doctor})
                         SET u.username = $username, u.sitio_web = $sitio_web
                         RETURN u`;

            const result = await session.run(query, params);

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

module.exports = { obtenerPerfil, actualizarPerfil };