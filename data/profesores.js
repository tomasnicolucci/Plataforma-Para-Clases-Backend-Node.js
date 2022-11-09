require('dotenv').config();
const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'ProyProfesoresNode';
const PROFESORES = 'Profesores';
const objectId = require('mongodb').ObjectId;


async function getProfesores(){
    const connectiondb = await connection.getConnection();
    const profes = await connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .find()
                            .toArray();
    return profes;
}

async function getProfesorById(profesorId) {
    const connectiondb = await connection.getConnection();
    const query = {_id: new objectId(profesorId)};
    const profesor = await connectiondb
                        .db(DATABASE)
                        .collection(PROFESORES)
                        .findOne(query);
     return profesor;
}
async function addProfesor(profesor){
    const connectiondb = await connection.getConnection();
    profesor.password = await bcrypt.hash(profesor.password, 8);
    const users = await  connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .insertOne(profesor);
    return profesor;
}

async function altaClase(clase, id, clasesProf){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .updateOne({_id: new objectId(id)}, {$set: {clases: clasesProf}});
    return result;
}

async function findByCredential(mail, password){
    const connectiondb = await connection.getConnection();
    const prof = await  connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .findOne({mail: mail});
    if(!prof){
        throw new Error('Usuario o contraseña incorrectos');
    }
    
    const isMatch = await bcrypt.compare(password, prof.password);

    if(!isMatch){
        throw new Error('Usuario o contraseña incorrectos');
    }

    return prof;
}

function generatedToken(prof){
    const token = jwt.sign({_id: prof._id, mail: prof.mail}, process.env.CLAVE_SECRETA, {expiresIn: "2h"});
    return token;
}

module.exports = {addProfesor, findByCredential, generatedToken, getProfesores, getProfesorById, altaClase}

