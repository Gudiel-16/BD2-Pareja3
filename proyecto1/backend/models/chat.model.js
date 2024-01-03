const createDriver = require('../database/config.neo4j');

const guardarMensaje = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // id1: es quien envia el mensaje
            let mensaje_y_fecha = params.id1 + "___" + params.fecha + "___" + params.mensaje;

            let query = `MATCH (c:Chat)
                        WHERE (c.id1 = $id1 AND c.id2 = $id2) OR (c.id1 = $id2 AND c.id2 = $id1)   
                        SET c.mensajes = coalesce(c.mensajes, []) + $new_mensaje
                        RETURN c`;

            const result = await session.run(query, {id1: params.id1, id2: params.id2, new_mensaje: mensaje_y_fecha});

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

const obtenerMensajes = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // id1: es quien envia el mensaje
            let mensaje_y_fecha = params.id1 + "___" + params.fecha + "___" + params.mensaje;

            let query = `MATCH (c:Chat)
                        WHERE (c.id1 = $id1 AND c.id2 = $id2) OR (c.id1 = $id2 AND c.id2 = $id1)
                        RETURN c`;

            const result = await session.run(query, {id1: params.id1, id2: params.id2, new_mensaje: mensaje_y_fecha});

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

module.exports = { guardarMensaje, obtenerMensajes };