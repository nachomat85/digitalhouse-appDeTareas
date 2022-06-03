const fs = require('fs');
//const tareas = fs.readFileSync('./tareas.json')
//let tareasJS = JSON.parse(tareas)
let action = process.argv[2];
let listarTareas = require('./funcionesDeTareas.js')

listarTareas(action)