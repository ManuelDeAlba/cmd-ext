const path = require("node:path");
const fs = require("node:fs/promises");
const pc = require("picocolors");

const [ , , ...nombres] = process.argv;

nombres.forEach(async nombre => {
    // Revisa si ya existe el archivo
    let existe = false;
    try{
        await fs.stat(nombre);
        existe = true;
    } catch(err){}

    // Si el archivo no existe, lo crea
    try{
        if(!existe){
            await fs.writeFile(nombre, "");
            
            let ruta = path.resolve(process.cwd(), nombre);
            console.log(pc.bgWhite(pc.black(`Archivo creado: ${ruta}`)));
        }
    } catch(err){
        if(err.code == 'EPERM'){
            console.log(pc.red("Error al crear el archivo: Permisos insuficientes"));
        } else if(err.code == 'ENOENT'){
            console.log(pc.red("Error al crear el archivo: Directorio inexistente"));
        } else {
            console.log(pc.red("Error al crear el archivo: " + err.message));
        }
    }
})