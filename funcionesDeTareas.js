// importa el modulo FS
const fs = require('fs');
const tareas = fs.readFileSync('./tareas.json') // cargamos el contenido de tareas.json

// a listarTareas se le pasa una acción, en este caso viene del argumento en posición 2 de la terminal> node app.js listar
let listarTareas = (action) => {
let tareasJS = JSON.parse(tareas) // parsea el JSON string a un array de objetos
switch (action){
    case 'listar' : // si el argumento que se pasa como parametro es Listar, correr la siguiente funcion
        console.log('Listado de tareas')
        console.log('-----------------')
        tareasJS.forEach((tarea, i) => console.log(`${i+1}. ${tarea.titulo} - ${tarea.estado}`));
        break;
        // crear: crea una nueva tarea tomando como nombre el cuarto argumento del comando de la temrinal 
    case 'crear' : 
        let nuevaTarea = {
            titulo: process.argv[3],
            estado: 'pendiente',
        };
        guardarTarea(nuevaTarea);
        break;
        // filtrar: se puede pasar como cuarto argumento los estados pendiente o finalizada para obtener un listado de las tareas en dicho estado.
    case 'filtrar': 
        let parametro = process.argv[3]
        let filtrado = filtrarPorEstado(parametro)
        filtrado.forEach((tarea, i) => console.log(`${i+1}. ${tarea.titulo} - ${tarea.estado}`));
        break;
    case undefined :
        console.log('Atención - Tienes que pasar una acción.');
        break;
    default :
        console.log('No entiendo qué quieres hacer.')
}
}

/* Guarda tareas */
let escribirJSON = arraytareas => fs.writeFileSync('./tareas.json',arraytareas,'utf8');
let guardarTarea = tareaAGuardar => {
let tareasJS = JSON.parse(tareas) // parsea el JSON string a un array de objetos
tareasJS.push(tareaAGuardar);
escribirJSON(JSON.stringify(tareasJS))}

/* filtrarPorEstado */
let filtrarPorEstado = estadoBuscado => {
let tareasJS = JSON.parse(tareas) // parsea el JSON string y crea un array de objetos
let tareasFiltradas = tareasJS.filter(element => element.estado == estadoBuscado);
return tareasFiltradas
}


module.exports = listarTareas