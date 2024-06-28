import { data, documentos } from "./modulo.js";



let formulario = document.querySelector("#form")

let select = document.createElement("select")
let cap = document.querySelector("#enviar")


let id = document.querySelector(".input_id")
let nombre = document.querySelector(".input_nombre")
let apellido = document.querySelector(".input_apellido")
let documento = document.querySelector(".input_documento")

// console.log(id.value);

// documentos().then((lista) => {
//   lista.forEach(e => {
//     let option = document.createElement("option")
//     option.textContent = e.nombre;
//     select.appendChild(option)
//     console.log(e);
//   });
// })

select.classList.add("options")

formulario.insertBefore(select, cap)

// console.log(formulario.lastChild)

function validar() {
  id.setAttribute('onkeypress', "return ((event.charCode >= 48 && event.charCode <= 57))")
  nombre.setAttribute('onkeypress', "return ((event.charCode >= 97 && event.charCode <= 122))")
  apellido.setAttribute('onkeypress', "return ((event.charCode >= 97 && event.charCode <= 122))")
  documento.setAttribute('onkeypress', "return ((event.charCode >= 48 && event.charCode <= 57))")
}

id.addEventListener('keydown', validar)
nombre.addEventListener('keydown', validar)
apellido.addEventListener('keydown', validar)
documento.addEventListener('keydown', validar)





let _datos = {
  id: id.value,
  nombre: nombre.value,
  apellido: apellido.value,
  documento: documento.value
}

console.log(_datos)

fetch('http://127.0.0.1:3000/user', {
  method: "POST",
  body: JSON.stringify(_datos),
  headers: { "Content-Type": "application/json; charset=UTF-8" }
})
  .then(response => response.json())
  .then(json => console.log(json));

// .catch (err => console.log(err));