// - chnames [path] [prefix] [name] - Rename using the prefix the files matching name

const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const ruta = process.argv[2] || ".";
const prefijo = process.argv[3] || "file";
const nombre = process.argv[4];

let rutaAbs = path.resolve(process.cwd(), ruta);

(async () => {
    // Se obtienen los archivos de la carpeta seleccionada
    let archivos;
    try{
        archivos = await fs.readdir(rutaAbs);
    } catch(err){
        console.error(pc.red(`No se pudo leer el directorio ${ruta}`));
        process.exit(1);
    }

    // Si la expresión existe se filtran los archivos que se van a renombrar
    let archivosFiltrados = [];
    if(nombre){
        archivos.forEach(archivo => {
            if(archivo.includes(nombre)){
                archivosFiltrados.push(archivo);
            }
        })
    } else {
        archivosFiltrados = [...archivos];
    }
    
    // Se pone un nombre temporal para evitar que se sobreescriban los archivos cuando coinciden los nombres
    let nuevosNombres = archivosFiltrados.map(async (archivo, indice) => {
        let rutaArchivo = path.join(rutaAbs, archivo);
        let extension = path.extname(archivo);

        try{
            let nuevoNombre = `tempname${Date.now()}${indice}${extension}`;
            let nuevaRuta = path.join(rutaAbs, nuevoNombre);
            await fs.rename(rutaArchivo, nuevaRuta);
            return nuevoNombre;
        } catch(err){
            console.log(pc.red("Error al renombrar temporalmente un archivo: " + archivo));
        }
    })

    // Solo se dejan los nombres de los archivos que sí se renombraron
    nuevosNombres = (await Promise.all(nuevosNombres)).filter(nombre => nombre !== undefined);

    // Se renombran correctamente
    nuevosNombres.forEach(async (archivo, indice) => {
        let rutaArchivo = path.join(rutaAbs, archivo);
        let extension = path.extname(archivo);

        try{
            let nuevoNombre = path.join(rutaAbs, `${prefijo}${indice+1}${extension}`);
            await fs.rename(rutaArchivo, nuevoNombre);
        } catch(err){
            console.log(pc.red("Error al renombrar un archivo: " + archivo));
        }
    })
})()