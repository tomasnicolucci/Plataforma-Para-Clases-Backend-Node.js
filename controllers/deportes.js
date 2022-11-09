const deportes = require('../data/deportes');

async function getDeportes() {
    return deportes.getAllDeportes();
}

async function getDeportesPorNombre(nombre) {
    let allDeportes = await deportes.getAllDeportes();
    return allDeportes.find(deportesAux => deportesAux.nombre === nombre);
}

async function insertDeporte(deporte){
    let deporteEncontrado = await getDeportesPorNombre(deporte.nombre);

    if(deporteEncontrado == undefined){
        return deportes.agregarDeporte(deporte);
    }
    else{
        console.log("El deporte que desea agregar, ya ha sido cargado previamente.")
    }
    
}

async function deleteDeporte(nombre){
    let deporteEncontrado = await getDeportesPorNombre(nombre);

    if(deporteEncontrado != undefined){
        return deportes.eliminarDeporte(deporteEncontrado)
    }
    else{
        console.log("El deporte que desea eliminar, no ha sido cargado previamente.")
    }
}



module.exports = { getDeportes, getDeportesPorNombre, insertDeporte, deleteDeporte};