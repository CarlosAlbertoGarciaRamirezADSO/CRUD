let dom = document;

let tabla = dom.querySelector("table")
let body_tabla = dom.querySelector("tbody")
const fragmento = document.createDocumentFragment();
export async function lista(){
    let response = await fetch("http://localhost:3000/users")
    let datos = await response.json();
    console.log(datos)
    
    
    datos.forEach( x => {
      let filas = document.createElement("tr")

      let columna_nombre = document.createElement("td")
      columna_nombre.textContent = x.nombre;

      let columna_apellido = document.createElement("td")
      columna_apellido.textContent = x.apellido;

      let columna_telefono = document.createElement("td")
      columna_telefono.textContent = x.telefono;

      let columna_direccion = document.createElement("td")
      columna_direccion.textContent = x.direccion;

      let columna_documento = document.createElement("td")
      columna_documento.textContent = x.documento;

      let columna_email = document.createElement("td")
      columna_email.textContent = x.email;

      filas.appendChild(columna_nombre)
      filas.appendChild(columna_apellido)
      filas.appendChild(columna_telefono)
      filas.appendChild(columna_direccion)
      filas.appendChild(columna_documento)
      filas.appendChild(columna_email)
      fragmento.appendChild(filas)
    });
    body_tabla.appendChild(fragmento)
}