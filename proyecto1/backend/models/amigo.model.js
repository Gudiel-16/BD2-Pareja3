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


module.exports = { agregarAmigo, misAmigos };