require('dotenv').config();
const conn = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const DATABASE = 'ProyProfesoresNode';
const ALUMNOS = 'Alumnos';
const objectId = require('mongodb').ObjectId;

async function getAllAlumnos(){
    const connectiondb = await conn.getConnection();
    const alumnos = await connectiondb
                        .db(DATABASE)
                        .collection(ALUMNOS)
                        .find()
                        .toArray();
    return alumnos;
}

async function getAlumnoPorId(id){
    const connectiondb = await conn.getConnection();
    const alumno = await connectiondb 
                        .db(DATABASE)
                        .collection(ALUMNOS)
                        .findOne({_id: new ObjectId(id)});
    return alumno;
}

async function agregarAlumno(alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .insertOne(alumno);
    return result;
}

async function eliminarAlumno(alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .deleteOne(alumno)
    return result;
}

async function modificarAlumno(id, alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .updateOne({_id: new objectId(id)}, {$set: {nombre: alumno.nombre, apellido: alumno.apellido, 
            dni:alumno.dni, telefono:alumno.telefono, nacimiento:alumno.nacimiento}})
    return result;
}

async function anotarseAClase(idClase, idAlumno, clasesAlumno){
    const connectiondb = await conn.getConnection();
    const result = await connectiondb
                        .db(DATABASE)
                        .collection(ALUMNOS)
                        .updateOne({_id: new ObjectId(idAlumno)}, {$set: {clases: clasesAlumno}});
    return result;
}

async function cancelarClase(idClase, idAlumno, clasesModificadas){
    const connectiondb = await conn.getConnection();
    const result = await connectiondb
                        .db(DATABASE)
                        .collection(ALUMNOS)
                        .updateOne({_id: new ObjectId(idAlumno)}, {$set: {clases: clasesModificadas}});
    return result;
}

async function findByCredential(mail, password){
    const connectiondb = await conn.getConnection();
    const alu = await  connectiondb
                            .db(DATABASE)
                            .collection(ALUMNOS)
                            .findOne({mail: mail});
    if(!alu){
        throw new Error('Usuario o contraseña incorrectos');
    }
    
    const isMatch = await bcrypt.compare(password, alu.password);

    if(!isMatch){
        throw new Error('Usuario o contraseña incorrectos');
    }

    return alu;
}

function generatedToken(alu){
    const token = jwt.sign({_id: alu._id, mail: alu.mail}, process.env.CLAVE_SECRETA, {expiresIn: "2h"});
    return token;
} 


module.exports = {generatedToken, findByCredential, getAllAlumnos, agregarAlumno, eliminarAlumno, modificarAlumno, getAlumnoPorId, anotarseAClase, cancelarClase}