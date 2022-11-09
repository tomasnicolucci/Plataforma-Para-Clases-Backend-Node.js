require('dotenv').config();
const { ObjectId } = require('mongodb');
const connection = require('./connection');
const profesores = require('./profesores')
const DATABASE = 'ProyProfesoresNode';
const CLASES = 'Clases';
const objectId = require('mongodb').ObjectId;

async function getClases(){
    const connectiondb = await connection.getConnection();
    const clases = await connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .find()
                            .toArray();
    return clases;
}

async function getClasePorId(id){
    const connectiondb = await connection.getConnection();
    const clase = await connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .findOne({_id: new ObjectId(id)});
    return clase;
}

async function addClase(clase){
    const connectiondb = await connection.getConnection();
    const clases = await  connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .insertOne(clase);                      
    return clase;
}

async function registrarAlumno(idClase, idAlumno, alumnosPorClase){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
                        .db(DATABASE)
                        .collection(CLASES)
                        .updateOne({_id: new ObjectId(idClase)}, {$set: {alumnos: alumnosPorClase}});
    return result;
}

async function eliminarAlumno(idClase, idAlumno, alumnosModificados){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
                        .db(DATABASE)
                        .collection(CLASES)
                        .updateOne({_id: new ObjectId(idClase)}, {$set: {alumnos: alumnosModificados}});
    return result;
}

module.exports = {getClases, addClase, getClasePorId, registrarAlumno, eliminarAlumno}