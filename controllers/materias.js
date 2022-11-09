const materias = require('../data/materias');

async function getMaterias() {
    return materias.getAllMaterias();
}

async function getMateriaPorNombre(nombre) {
    let allMaterias = await materias.getAllMaterias();
    return allMaterias.find(materiaAux => materiaAux.nombre === nombre);
}

async function insertMateria(materia){
    let materiaEncontrada = await getMateriaPorNombre(materia.nombre);

    if(materiaEncontrada == undefined){
        return materias.agregarMateria(materia);
    }
    else{
        console.log("La materia que desea agregar, ya ha sido cargada previamente.")
    }
    
}

async function deleteMateria(materia){
    let materiaEncontrada = await getMateriaPorNombre(materia.nombre);

    if(materiaEncontrada != undefined){
        return materias.eliminarMateria(materiaEncontrada)
    }
    else{
        console.log("La materia que desea eliminar, no ha sido cargada previamente.")
    }
}



module.exports = { getMaterias, getMateriaPorNombre, insertMateria, deleteMateria};