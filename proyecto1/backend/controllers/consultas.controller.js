const PacienteModelMongo = require('../models/models_mongo/paciente.model');
const LogactividadModelMongo = require('../models/models_mongo/logactividad.model');
const { response } = require('../helpers/response.helper');

const consulta_1 = async (req, res) => {

    try {

        const resultado = await PacienteModelMongo.aggregate([
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lt: ["$edad", 18] }, then: "Pediátrico" },
                      { case: { $and: [{ $gte: ["$edad", 18] }, { $lte: ["$edad", 64] }] }, then: "Mediana edad" },
                      { case: { $gt: ["$edad", 64] }, then: "Geriátrico" }
                    ],
                    default: "Desconocido"
                  }
                },
                total: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                categoria: "$_id",
                total: 1
              }
            }
          ]);

        response(res, 200, 'Consulta 1, obtenida con exito', resultado);   

    } catch (error) {
        return response(res, 400, 'Error al realizar consulta 1.', [error]);
    }

}

const consulta_2 = async (req, res) => {

    try {

        const resultado = await LogactividadModelMongo.aggregate([
            {
              $group: { // Agrupo por idHabitacion
                _id: "$idHabitacion",
                habitacion: { $first: "$idHabitacion" },
                nombreHabitacion: { $first: "$nombreHabitacion" },
                cantidad: { $sum: 1 }
              }
            },
            {
              $lookup: { // Unir los resultados con la colección habitaciones
                from: "habitaciones", // Nombre de la colección de habitaciones
                localField: "_id",
                foreignField: "idHabitacion",
                as: "infoHabitacion"
              }
            },
            {
              $unwind: "$infoHabitacion" // Desconstruye el array resultante de la unión (infoHabitacion) para obtener un documento por cada elemento del array.
            },
            {
              $project: { // campos a mostrar
                _id: 0,
                idHabitacion: "$_id",
                habitacion: "$infoHabitacion.habitacion",
                cantidad: 1
              }
            }
          ]);

        response(res, 200, 'Consulta 2, obtenida con exito', resultado);   

    } catch (error) {
        return response(res, 400, 'Error al realizar consulta 2.', [error]);
    }

}

const consulta_3 = async (req, res) => {

    try {

        const resultado = await PacienteModelMongo.aggregate([
            {
              $group: {
                _id: "$genero",
                genero: { $first: "$genero" },
                cantidad: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                genero: 1,
                cantidad: 1
              }
            }
          ]);

        response(res, 200, 'Consulta 3, obtenida con exito', resultado);   

    } catch (error) {
        return response(res, 400, 'Error al realizar consulta 3.', [error]);
    }

}

const consulta_4 = async (req, res) => {

    try {

        const resultado = await PacienteModelMongo.aggregate([
            {
              $group: {
                _id: "$edad",
                edad: { $first: "$edad" },
                cantidad: { $sum: 1 }
              }
            },
            {
              $sort: { cantidad: -1 } // Ordena en orden descendente por cantidad
            },
            {
              $limit: 5 // Limita los resultados a los primeros 5
            },
            {
              $project: {
                _id: 0,
                edad: 1,
                cantidad: 1
              }
            }
          ]);

        response(res, 200, 'Consulta 4, obtenida con exito', resultado);   

    } catch (error) {
        return response(res, 400, 'Error al realizar consulta 4.', [error]);
    }

}

const consulta_5 = async (req, res) => {

    try {

        const resultado = await PacienteModelMongo.aggregate([
            {
              $group: {
                _id: "$edad",
                edad: { $first: "$edad" },
                cantidad: { $sum: 1 }
              }
            },
            {
              $sort: { cantidad: 1 } // Ordena en orden ascendente por cantidad
            },
            {
              $limit: 5 // Limita los resultados a los primeros 5
            },
            {
              $project: {
                _id: 0,
                edad: 1,
                cantidad: 1
              }
            }
          ]);

        response(res, 200, 'Consulta 5, obtenida con exito', resultado);   

    } catch (error) {
        return response(res, 400, 'Error al realizar consulta 5.', [error]);
    }

}

module.exports = { consulta_1, consulta_2, consulta_3, consulta_4, consulta_5 };