import solicitud from "./modulos/ajax.js";
import { lista } from "./modulos/lista.js";
import  required  from "./modulos/required.js";
import option from "./modulos/solicitud.js";
// import solicitud from "./modulos/ajax.js";   

const dom = document;

let nombre = dom.querySelector("#nombre")
let apellido = dom.querySelector("#apellido")
let telefono = dom.querySelector("#telefono")
let direccion = dom.querySelector("#direccion")
let documento = dom.querySelector("#documento")
let email = dom.querySelector("#email")
let enviar = dom.querySelector("#enviar")
let checkbox = dom.querySelector("#check")
let formulario = dom.querySelector("#form")
let select = dom.querySelector("#tipo_documento")

let body_tabla = dom.querySelector("tbody")
const fragmento = document.createDocumentFragment();

option("documents")
    .then(data =>{
        data.forEach(element => {
            let option = document.createElement("option")
            option.textContent = element.nombre
            let id = element.id
            option.setAttribute("value",id)
            select.classList.add("input")
            select.appendChild(option)
        });
    })


lista().then(datos =>{
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

        let boton = document.createElement("button")
        boton.classList.add("boton--colores")
        boton.textContent = "editar";
        boton.addEventListener("click",(event)=>{
            
            
        })

        filas.appendChild(columna_nombre)
        filas.appendChild(columna_apellido)
        filas.appendChild(columna_telefono)
        filas.appendChild(columna_direccion)
        filas.appendChild(columna_documento)
        filas.appendChild(columna_email)
        filas.appendChild(boton)
        fragmento.appendChild(filas)
    });
    body_tabla.appendChild(fragmento)
})



let letras = (event,elemento) =>{
    let letras = /^[a-zA-Z]$/
    if (elemento.value == "") {
        elemento.classList.add("alert")
        elemento.classList.remove("good")
    }
    if(letras.test(event.key)){
        console.log("si");
        elemento.classList.remove("alert")
        elemento.classList.add("good")
    }else{
        event.preventDefault()

    }
}

let numeros = (event,elemento)=>{
    let numeros = /^[0-9]{0,12}$/

    if(numeros.test(event.key)){
            console.log("si");
            elemento.classList.remove("alert")
            elemento.classList.add("good")
        }else if(elemento.value.length <10 ){
            console.log("NOO");
            elemento.classList.add("alert")
            elemento.classList.remove("good")
            event.preventDefault()
            
        }


    if(elemento.value.length ===10){
        elemento.classList.add("alert")
        elemento.classList.remove("good")
        event.preventDefault()
    }

}



let correo = (event,input)=>{
    // let correo = /^\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com\b$/
    let correo = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/
    console.log(input.value);
    console.log(event);
        if(correo.test(input.value)){
            console.log("si");
            email.classList.remove("alert")
            email.classList.add("good")
        }else{
            console.log("no")
            email.classList.remove("good")
            email.classList.add("alert")

            event.preventDefault() 
        }

    }
    let dire = (event,input)=>{
    let correo = /[A-Za-z0-9]+/g
    console.log(input.value);
    console.log(event);
    if (input.value == "") {
        input.classList.add("alert")
        input.classList.remove("good")
    }else if(correo.test(event.key)){
        console.log("si");
        input.classList.remove("alert")
        input.classList.add("good")
        
    }
    else{
        event.preventDefault()
        console.log("no")
        input.classList.remove("good")
        input.classList.add("alert")
    }
}

let checkear = ()=>{
    if (checkbox.checked) {
        enviar.removeAttribute("disabled")
    }else{
        enviar.setAttribute("disabled","")
    }
}

checkbox.addEventListener("click",checkear)

formulario.addEventListener("submit",(event)=>{
    const data = {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: telefono.value,
                direccion: direccion.value,
                documento: documento.value,
                email: email.value
            }
    let respuesta = required(event, "form [required]")

            console.log(data);

            if(respuesta){
                fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((respuesta) => respuesta.json())
            .then((json) => {});
    }          
})

nombre.addEventListener("keypress",(event)=>{
    letras(event,nombre)
})
nombre.addEventListener("blur",(event)=>{
    letras(event,nombre)
})


apellido.addEventListener("keypress",(event)=>{
    letras(event,apellido)
})
apellido.addEventListener("blur",(event)=>{
    letras(event,apellido)
})



telefono.addEventListener("keypress",(event)=>{
    numeros(event,telefono)
})
telefono.addEventListener("blur",(event)=>{
    letras(event,telefono)
})




documento.addEventListener("keypress",(event)=>{
    numeros(event,documento)
})
documento.addEventListener("blur",(event)=>{
    letras(event,documento)
})

direccion.addEventListener("keypress",(event)=>{
    dire(event,direccion)
})
direccion.addEventListener("blur",(event)=>{
    dire(event,direccion)
})


email.addEventListener("blur",(event)=>{
    correo(event,email)
})
email.addEventListener("blur",(event)=>{
    letras(event,email)
})


