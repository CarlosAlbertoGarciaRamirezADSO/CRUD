import { URL } from "./config.js";

const solicitud = async (url) =>{
    let solicitud = await fetch(`http://localhost:3000/${url}`)
    let data = await solicitud.json()
    return data
}
export const enviar_form = async (endpoint,options)=>{
    try {
        let solicitud = await fetch(`${URL}/${endpoint}`)
        let data = await solicitud.json();
        return data
    } catch (error) {
        return error
    }
}
export default solicitud