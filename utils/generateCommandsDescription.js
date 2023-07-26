const fs = require("node:fs/promises");
const path = require("node:path");

let rutaComandos = path.resolve(__dirname, "../src");
(async () => {
    // Buscar los archivos que están en src
    let archivos = await fs.readdir(rutaComandos, "utf-8");

    for(let archivo of archivos){
        let rutaArchivo = path.join(rutaComandos, archivo);
        
        // Si es un directorio salta la iteración
        let isDirectory = (await fs.stat(rutaArchivo)).isDirectory();
        if(isDirectory) continue;
        
        // Por cada archivo leer la primera linea para obtener la descripción
        let contenido = await fs.readFile(rutaArchivo, "utf-8");
        let descripcion = contenido.split("\n")[0].slice(3);
        console.log(descripcion);
    }
})()