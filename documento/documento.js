import  validar  from "./validacionform/modulos/required.js";
const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");


formulario.addEventListener("submit", (event) => {
    let respuesta = validar(event, "form [required]")
    const data = {
        nombre: nombre.value,
    }
    if (respuesta) {
        fetch('http://localhost:3000/documents', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
    }
})
