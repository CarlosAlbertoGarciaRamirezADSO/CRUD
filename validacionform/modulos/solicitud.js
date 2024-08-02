import { URL } from "./config.js";

async function option(url){
    let respuesta = await fetch(`${URL}/${url}`);
    let datos = await respuesta.json();  
    return datos
}
export default option