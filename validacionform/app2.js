import { lista } from "./modulos/lista.js";
import  required  from "./modulos/required.js";

lista()
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


let letras = (event,elemento) =>{
    let letras = /^[a-zA-Z]$/
    // console.log(event.key);
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
    // console.log(event.key);
    // console.log(event);
    // if (elemento.value == "") {
    //     elemento.classList.add("alert")
    //     elemento.classList.remove("good")
    // }
    // if(numeros.test(event.key)){
    //     console.log("si");
    //     elemento.classList.remove("alert")
    //     elemento.classList.add("good")
    // }
    // else{
    //     event.preventDefault()
    //     console.log("no")
    //     elemento.classList.remove("good")
    //     elemento.classList.add("alert")
    // }

    // if (!numeros.test(event.key) || elemento.value.lenght >= 12) {
    //     event.preventDefault();
    // }
    // else {
    // }
    
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
    let respuesta = required(event, "form [required]")

    const data = {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: telefono.value,
                direccion: direccion.value,
                documento: documento.value,
                email: email.value
            }
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
            .then((json) => {
                nombre.value = ''
            });
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


