import { lista } from "./modulos/lista.js";

lista()
let dom = document;

let nombre = dom.querySelector("#nombre")
let apellido = dom.querySelector("#apellido")
let telefono = dom.querySelector("#telefono")
let direccion = dom.querySelector("#direccion")
let documento = dom.querySelector("#documento")
let email = dom.querySelector("#email")
let enviar = dom.querySelector("#enviar")
let checkbox = dom.querySelector("#check")
let formulario = dom.querySelector("form")



let letras = (event,elemento) =>{
    let letras = /^[a-zA-Z]$/
    console.log(event.key);
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
        // elemento.classList.add("alert")
        // elemento.classList.remove("good")
        // console.log("no")
    }
}

let numeros = (event,elemento)=>{
    let numeros = /^[0-9]{0,12}$/
    console.log(event.key);
    console.log(event);
    if (elemento.value == "") {
        elemento.classList.add("alert")
        elemento.classList.remove("good")
    }
    if(numeros.test(event.key)){
        console.log("si");
        elemento.classList.remove("alert")
        elemento.classList.add("good")
        
    }else{
        event.preventDefault()
        console.log("no")
        elemento.classList.remove("good")
        elemento.classList.add("alert")
    }
    
}

let correo = (event,input)=>{
    // let correo = /^\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com\b$/
    let correo = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/
    console.log(input.value);
    console.log(event);
    if (input.value.trim() === "") {
        console.log("correo obligatorio");
        email.classList.add("alert")
        email.classList.remove("good")
    }else{
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
}
let dire = (event,input)=>{
    let correo = /^[a-zA-Z0-9-#]/s
    // let correo = /[A-Za-z0-9]+/g
    console.log(input.value);
    console.log(event);
    if (input.value == "") {
        input.classList.add("alert")
        input.classList.remove("good")
    }
    if(correo.test(event.key)){
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

let agregar = (event)=>{

    let num = 0;
    
    if (nombre.value.trim() == "") {
        nombre.classList.add("alert")
        num = 1
    }
    if (apellido.value.trim() == "") {
        apellido.classList.add("alert")
        num = 1
    }
    if (telefono.value.trim() == "") {
        telefono.classList.add("alert")
        num = 1
    }
    if (direccion.value.trim() == "") {
        direccion.classList.add("alert")
        num = 1
    }
    if (documento.value.trim() == "") {
        documento.classList.add("alert")
        num = 1
    }
    if (email.value.trim() == "") {
        email.classList.add("alert")
        num = 1
    }
    if (num === 0) {
        const data = {
            nombre: nombre.value,
            apellido: apellido.value,
            telefono: telefono.value,
            direccion: direccion.value,
            documento: documento.value,
            email:email.value
        }
        fetch('http://localhost:3000/users', {
            method: "POST",
            body: JSON.stringify(data),
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

formulario.addEventListener('submit', agregar)


checkbox.addEventListener("click",checkear)

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

let envia = (event)=>{
    event.preventDefault()
}
form.addEventListener("submit",envia)

