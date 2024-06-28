export const data = async ()=> {
  const solicitud = await fetch("http://127.0.0.1:3000/user")
  const respuesta = await solicitud.json()
  return respuesta
}

export const documentos = async () => {
  const solicitud = await fetch("http://127.0.0.1:3000/docs")
  const respuesta = await solicitud.json()
  return respuesta
}