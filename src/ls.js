// - ls [dir] - List the information about the files in the selected directory (current by default)

const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const ruta = process.argv[2] ?? ".";

async function ls(ruta){
    // Se obtienen todos los nombres de archivos de la ruta actual
    let archivos;
    try{
        archivos = await fs.readdir(ruta, "utf-8");
    } catch(err){
        console.error(pc.red(`No se pudo leer el directorio ${ruta}`));
        process.exit(1);
    }

    // Por cada archivo se obtienen sus datos
    let maxLength = 0;
    let stats = archivos.map(async archivo => {
        try{
            let stat = await fs.stat(path.join(ruta, archivo));
    
            let tipo = stat.isDirectory() ? "d" : "f";
            let tam = (stat.size / 1024).toFixed(2);
            tam = tam > 0 ? tam + " kb" : "";
    
            maxLength = archivo.length > maxLength ? archivo.length : maxLength;
    
            return {
                tipo,
                nombre: archivo,
                tam
            };
        } catch(err){
            console.error(pc.red(`No se pudo leer la información de ${ruta}`));
            process.exit(1);
        }
    })
    stats = await Promise.all(stats);

    // Se ordenan para que primero salgan los directorios
    stats = stats.sort((a, b) => a.tipo < b.tipo ? -1 : 1);

    // Se muestran la ruta del directorio que se está viendo
    if(path.isAbsolute(ruta)){
        console.log(pc.bgWhite(pc.black("Directorio: " + path.resolve(ruta))));
    } else {
        console.log(pc.bgWhite(pc.black("Directorio: " + path.join(process.cwd(), ruta))));
    }
    
    // Se muestran los datos del "ls"
    stats.forEach(({tipo, nombre, tam}) => {
        let cTipo = pc.bgWhite(" " + pc.black(tipo) + " ");
        let cNombre = tipo == "d" ? pc.bgBlue(nombre) : pc.blue(nombre.padEnd(maxLength + 1));

        console.log(`${cTipo} ${cNombre} ${tam}`);
    })
}

ls(ruta);