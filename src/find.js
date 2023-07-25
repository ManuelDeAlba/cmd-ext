const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const nombre = process.argv[2];
const raiz = process.argv[3] || ".";
const raizAbs = path.resolve(process.cwd(), raiz);

if(!nombre){
    console.log(pc.red("Introduce el nombre del archivo\nfind [nombre] [raiz]"));
    process.exit(1);
}

console.log(pc.bgWhite(pc.black("Buscando: " + nombre)));
async function buscarArchivo(carpetaAbs, nombre){
    // Se obtienen todos los nombres de archivos de la ruta actual
    let archivos;
    try{
        archivos = await fs.readdir(carpetaAbs, "utf-8");
    } catch(err){
        console.error(pc.red(`No se pudo leer el directorio ${carpetaAbs}`));
        process.exit(1);
    }

    // Por cada archivo ver si el nombre coincide
    // Por cada directorio buscar recursivamente
    archivos.forEach(async archivo => {
        let rutaAbs = path.join(carpetaAbs, archivo);
        let isDirectory = (await fs.stat(rutaAbs)).isDirectory();

        // Si es una carpeta busca recursivamente
        if(isDirectory) buscarArchivo(rutaAbs, nombre);

        // Si el nombre coincide con el directorio o archivo, lo muestra
        if(archivo.includes(nombre)){
            if(isDirectory) console.log(`${pc.bgWhite(pc.black(" d "))} ${pc.bgBlue(pc.white(rutaAbs))}`);
            else console.log(`${pc.bgWhite(pc.black(" f "))} ${pc.blue(rutaAbs)}`);
        }
    })
}

buscarArchivo(raizAbs, nombre);