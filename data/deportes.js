const conn = require('./connection');
const DATABASE = 'ProyProfesoresNode';
const DEPORTES = 'Deportes';
const objectId = require('mongodb').ObjectId;

async function getAllDeportes(){
    const connectiondb = await conn.getConnection();
    const deportes = await connectiondb
                        .db(DATABASE)
                        .collection(DEPORTES)
                        .find()
                        .toArray();
    return deportes;
}

async function agregarDeporte(deporte){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(DEPORTES)
        .insertOne(deporte);
    return result;
}

async function eliminarDeporte(deporte){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(DEPORTES)
        .deleteOne(deporte);
    return result;
}



module.exports = {getAllDeportes,agregarDeporte,eliminarDeporte}