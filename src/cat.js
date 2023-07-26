// - cat [file] - Display the file content

const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const ruta = process.argv[2];

// Si no se especificó el archivo, muestra un mensaje
if(!ruta){
    console.log(pc.red("Introduce el nombre del archivo\ncat [nombre]"));
    process.exit(1);
}

(async () => {
    // Se intenta leer el archivo
    try{
        let contenido = await fs.readFile(ruta, "utf-8");
    
        // Se muestran la ruta del archivo
        if(path.isAbsolute(ruta)){
            console.log(pc.bgWhite(pc.black("Archivo: " + path.resolve(ruta))));
        } else {
            console.log(pc.bgWhite(pc.black("Archivo: " + path.join(process.cwd(), ruta))));
        }
    
        // Se muestra el contenido del archivo
        console.log(pc.bgBlack(pc.white(contenido)));
    } catch(err){
        console.error(pc.red(`No se pudo leer el archivo ${ruta}`));
        process.exit(1);
    }
})()