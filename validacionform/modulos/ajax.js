const solicitud = async (url) =>{
    let solicitud = await fetch(`http://127.0.0.1/${url}`)
    data = await solicitud.json()
    return data
}
export default solicitud