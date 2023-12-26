const createDriver = require('../database/config.neo4j');

const insertarPublicacion = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // MERGE: si no existe el nodo Publicacion para un doctor, lo crea automaticamente 
            // coalesce: si es null asigna un array vacio
            let texto_y_fecha = params.texto + "___" + params.fecha;
            let query = `MERGE (p:Publicacion {id_doctor: $id_doctor})          
                        SET p.pub = coalesce(p.pub, []) + $new_pub
                        RETURN p`;

            const result = await session.run(query, {id_doctor: params.id_doctor, new_pub: texto_y_fecha});

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
                `MATCH (u:Usuario {id_doctor: $id_doctor}) 
                MATCH (p:Publicacion {id_doctor: $id_doctor}) 
                RETURN u, p`,
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

const obtenerPublicacionesDeAmigos = (params) => {
    return new Promise(async (resolve, reject) => {

        let session;

        try {

            // conexion
            const driver = createDriver();
            session = driver.session({ database: process.env.DB_NEO4J_NAME_DB });

            // obtengo amigos y la coleccion de publicaciones que tiene ese amigo
            const result = await session.run(
                `MATCH (usuario:Usuario {id_doctor: $id_doctor})-[:ES_AMIGO_DE]-(amigo),
                (publicacion:Publicacion {id_doctor: amigo.id_doctor})
                RETURN DISTINCT amigo, COLLECT(DISTINCT publicacion) AS publicaciones`,
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

module.exports = { insertarPublicacion, obtenerPublicacionesPorIdDoctor, obtenerPublicacionesDeAmigos };
