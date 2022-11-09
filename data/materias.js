const conn = require('./connection');
const DATABASE = 'ProyProfesoresNode';
const MATERIAS = 'Materias';
const objectId = require('mongodb').ObjectId;

async function getAllMaterias(){
    const connectiondb = await conn.getConnection();
    const materias = await connectiondb
                        .db(DATABASE)
                        .collection(MATERIAS)
                        .find()
                        .toArray();
    return materias;
}

async function agregarMateria(materia){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(MATERIAS)
        .insertOne(materia);
    return result;
}

async function eliminarMateria(materia){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(MATERIAS)
        .deleteOne(materia);
    return result;
}

module.exports = {getAllMaterias,agregarMateria,eliminarMateria}