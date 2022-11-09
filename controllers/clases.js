const clases = require('../data/clases');

async function getClases() {
    return clases.getClases();
}

async function getClasePorId(id){
    return clases.getClasePorId(id);
}

async function addClase(clase){
    return clases.addClase(clase);
}

module.exports = {getClases, addClase, getClasePorId}