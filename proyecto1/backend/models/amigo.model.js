const createDriver = require('../database/config.neo4j');

const agregarAmigo = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuario1:Usuario {id_doctor: $id_doctor}), (usuario2:Usuario {id_doctor: $id_amigo})
                        CREATE (usuario1)-[:ES_AMIGO_DE]->(usuario2)
                        CREATE (usuario2)-[:ES_AMIGO_DE]->(usuario1)`;

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

const misAmigos = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuario:Usuario {id_doctor: $id_doctor})-[:ES_AMIGO_DE]-(amigo)
                         RETURN DISTINCT amigo`;

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

const usuariosQueNoSonMisAmigos = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuarioActual:Usuario {id_doctor: $id_doctor})
                        MATCH (otrosUsuarios:Usuario)
                        WHERE otrosUsuarios <> usuarioActual
                        AND NOT (usuarioActual)-[:ES_AMIGO_DE]-(otrosUsuarios)
                        RETURN DISTINCT otrosUsuarios`;

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

const busquedaPorNombre = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuarioActual:Usuario {id_doctor: $id_doctor})
                        MATCH (otrosUsuarios:Usuario)
                        WHERE otrosUsuarios <> usuarioActual
                        AND NOT (usuarioActual)-[:ES_AMIGO_DE]-(otrosUsuarios)
                        AND (TOLOWER(otrosUsuarios.nombre) CONTAINS TOLOWER($nombre))
                        RETURN DISTINCT otrosUsuarios`;

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

const amigosDeAmigos = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuario:Usuario {id_doctor: $id_doctor})-[:ES_AMIGO_DE]-(amigo)
                         MATCH (amigo:Usuario)-[:ES_AMIGO_DE]-(amigoDeAmigo:Usuario)
                         WHERE usuario <> amigo AND usuario <> amigoDeAmigo
                         AND NOT (usuario)-[:ES_AMIGO_DE]-(amigoDeAmigo)
                         RETURN DISTINCT amigoDeAmigo`;

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

const busquedaPorEspecialidad = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            let query = `MATCH (usuarioActual:Usuario {id_doctor: $id_doctor})
                        MATCH (otrosUsuarios:Usuario)
                        WHERE otrosUsuarios <> usuarioActual
                        AND NOT (usuarioActual)-[:ES_AMIGO_DE]-(otrosUsuarios)
                        AND (TOLOWER(otrosUsuarios.especialidad) CONTAINS TOLOWER($especialidad))
                        RETURN DISTINCT otrosUsuarios`;

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

module.exports = { agregarAmigo, misAmigos, usuariosQueNoSonMisAmigos, busquedaPorNombre, amigosDeAmigos, busquedaPorEspecialidad };