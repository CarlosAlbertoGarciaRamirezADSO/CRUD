let dom = document;

let nombre = dom.querySelector("#nombre")
let apellido = dom.querySelector("#apellido")
let telefono = dom.querySelector("#telefono")
let direccion = dom.querySelector("#direccion")
let documento = dom.querySelector("#documento")
let email = dom.querySelector("#email")
let enviar = dom.querySelector("#enviar")
let checkbox = dom.querySelector("#check")

let letras = (event,elemento) =>{
    let letras = /^[a-zA-Z]$/
    console.log(event.key);
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
    let correo = /^\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com\b$/
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
            event.preventDefault()
            console.log("no")
            email.classList.remove("good")
            email.classList.add("alert")
        }

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

nombre.addEventListener("keypress",(event)=>{
    letras(event,nombre)
})
// nombre.addEventListener("blur",(event)=>{
//     letras(event,nombre)
// })

apellido.addEventListener("keypress",(event)=>{
    letras(event,apellido)
})
// apellido.addEventListener("blur",(event)=>{
//     letras(event,apellido)
// })
telefono.addEventListener("keypress",(event)=>{
    numeros(event,telefono)
})

documento.addEventListener("keypress",(event)=>{
    numeros(event,documento)
})

email.addEventListener("blur",(event)=>{
    correo(event,email)
})

let envia = (event)=>{
    event.preventDefault()
}
form.addEventListener("submit",envia)

