//dom 

let cap = document.querySelector("#enviar")
let formulario = document.querySelector("#form")

let table_tr = document.createElement("tr")

let select = document.createElement("select")
const fragmento = document.createDocumentFragment();


let numeros = /^[0-9]{1,}$/
let letras = /^[A-Za-z]+$/




async function datos(){
  let response = await fetch("http://localhost:3000/documentos")
  let data = await response.json();
  console.log(data)
  
  
  data.forEach( x => {
    let option = document.createElement("option")
    
    option.textContent = x.nombre;
    // console.log(option);
    select.appendChild(option)
    
  });
  fragmento.appendChild(select)
  formulario.appendChild(fragmento)
  select.classList.add("options")
  formulario.insertBefore(select, cap)
}
datos();



let id = document.querySelector(".input_id")
let nombre = document.querySelector(".input_nombre")
let apellido = document.querySelector(".input_apellido")
let documento = document.querySelector(".input_documento")



function validar() {
  
  nombre.setAttribute('onkeypress', "return ((event.charCode >= 97 && event.charCode <= 122))")
  apellido.setAttribute('onkeypress', "return ((event.charCode >= 97 && event.charCode <= 122))")
  documento.setAttribute('onkeypress', "return ((event.charCode >= 48 && event.charCode <= 57))")
}

nombre.addEventListener('keydown', validar)
apellido.addEventListener('keydown', validar)
documento.addEventListener('keydown', validar)


// async function registros() {
//   let peticion = await fetch("http://localhost:3000/users")
//   let parsear = await peticion.json()
  
//   console.log(parsear);
//   parsear.forEach(y =>{
//     let table_td = document.createElement("td")
//     console.log(y);
//     // table_td.textContent = y.id
//     table_tr.appendChild(table_td)
//     console.log(table_td);
//   })

// }
// registros()


const enviar = (event)=>{
  
  let num = 0;
  event.preventDefault();
  if (select.value.trim() == "Tipo Documento") {
    select.classList.add("alert")
    num = 1
  }
  if (nombre.value.trim() == "") {
    nombre.classList.add("alert")
    num = 1
  }
  if (apellido.value.trim() == "") {
    apellido.classList.add("alert")
    num = 1
  }
  if (documento.value.trim() == "") {
    documento.classList.add("alert")
    num = 1
  }
  if (num === 0) {
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        documento: documento.value,
        tipo_documento:select.value
    }
    fetch('http://localhost:3000/users', {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {"Content-type": "application/json;charset=UTF-8",}
          })
          .then(response => response.json()) 
          .then(json => alert("Registrado con exito", console.log(json)))
          .catch(err => {
            console.log("error", err)
            alert("No se registro")
          }); 
  }
}
formulario.addEventListener('submit', enviar)

