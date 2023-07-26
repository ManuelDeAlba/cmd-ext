// - fetch [url] ... [url] - Fetch info from urls

const pc = require("picocolors");

const [, , ...urls] = process.argv;

(() => {
    try{
        urls.forEach(async url => {
            const res = await fetch(url)
            const data = await res.json();

            console.log(pc.bgWhite(pc.black(`Fetch a ${url}`)));
            console.log(data);
        })
    } catch(err){
        console.error(pc.red("Error al hacer el fetch: " + err))
    }
})()