const dataAlumnos = require('../data/alumnos');
const dataClases = require('../data/clases');
const bcrypt = require('bcrypt')
const objectId = require('mongodb').ObjectId;

async function getAllAlumnos() {
    return dataAlumnos.getAllAlumnos();
}

async function getAlumnoPorId(id){
    return dataAlumnos.getAlumnoPorId(id);
}

async function agregarAlumno(alumno){
    let password = await bcrypt.hash(alumno.password,10);
    let nacimiento = new Date(alumno.nacimiento);
    alumno.password = password;
    alumno.nacimiento = nacimiento;
    return dataAlumnos.agregarAlumno(alumno);
    
}

async function eliminarAlumno(id){
    let alumnoEncontrado = await getAlumnoPorId(id);

    if(alumnoEncontrado != undefined){
        return dataAlumnos.eliminarAlumno(alumnoEncontrado);
    }
    else{
        console.log("El alumno a eliminar, no ha sido encontrado")
    }
}

async function modificarAlumno(id, alumno){
    let nacimiento = new Date(alumno.nacimiento);
    alumno.nacimiento = nacimiento;
    return dataAlumnos.modificarAlumno(id, alumno);
}

async function anotarseAClase(idClase, idAlumno){
    const alu = await dataAlumnos.getAlumnoPorId(idAlumno);
    let clasesAlumno = alu.clases;
    clasesAlumno.push(idClase);
    dataAlumnos.anotarseAClase(idClase, idAlumno, clasesAlumno);

    const clas = await dataClases.getClasePorId(idClase);
    let alumnosPorClase = clas.alumnos;
    alumnosPorClase.push(idAlumno);
    //console.log(alumnosPorClase);
    dataClases.registrarAlumno(idClase, idAlumno, alumnosPorClase);
}

async function cancelarClase(idClase, idAlumno){
    const alu = await dataAlumnos.getAlumnoPorId(idAlumno);
    const clasesAlumno = alu.clases;
    //console.log(clasesAlumno);
    const clasesModificadas = clasesAlumno.filter( c => c !== idClase);
    dataAlumnos.cancelarClase(idClase, idAlumno, clasesModificadas);
    //console.log(clasesModificadas);

    const clas = await dataClases.getClasePorId(idClase);
    const alumnosPorClase = clas.alumnos;
    //console.log(alumnosPorClase);
    const alumnosModificados = alumnosPorClase.filter( a => a !== idAlumno);
    //console.log(alumnosModificados);
    dataClases.eliminarAlumno(idClase, idAlumno, alumnosModificados);
}

module.exports = {getAllAlumnos, getAlumnoPorId, agregarAlumno, eliminarAlumno, modificarAlumno, anotarseAClase, cancelarClase}