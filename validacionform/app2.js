import solicitud, {enviar_form} from "./modulos/ajax.js";

import  required  from "./modulos/required.js";
import option from "./modulos/solicitud.js";
 

const dom = document;

let name = dom.querySelector("#nombre")
let last = dom.querySelector("#apellido")
let phone = dom.querySelector("#telefono")
let addres = dom.querySelector("#direccion")
let doc = dom.querySelector("#documento")
let emails = dom.querySelector("#email")
let enviar = dom.querySelector("#enviar")
let checkbox = dom.querySelector("#check")
let formulario = dom.querySelector("#form")
let select = dom.querySelector("#tipo_documento")

let oculto = dom.querySelector("#oculto")

let table = document.querySelector("table")
let body_tabla = dom.querySelector("tbody")
const fragmento = document.createDocumentFragment();

let template = document.querySelector("template").content;

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


const lista = async()=>{
    const data = await solicitud("users")
    const documentos = await solicitud("documents")

    console.log(template);
    
    data.forEach(element => {
        console.log(template);
        
        // let documento = documentos.find((doc)=> doc.id === element.)
        template.querySelector("tr").id = `user_${element.id}`
        template.querySelector(".first_name").textContent = element.nombre
        template.querySelector(".last_name").textContent = element.apellido
        template.querySelector(".phone").textContent = element.telefono
        template.querySelector(".addres").textContent = element.direccion
        template.querySelector(".document").textContent = element.documento
        template.querySelector(".email").textContent = element.email
        
        template.querySelector(".edit").setAttribute("data-id",element.id)
        template.querySelector(".delete").setAttribute("data-id",element.id)

        let clone = document.importNode(template,true)
        fragmento.appendChild(clone)
    });
    table.querySelector("tbody").appendChild(fragmento)
}
lista()

const loadForm = (data)=>{
    console.log(data);
    
    const {id,nombre,apellido,telefono,direccion,documento,email} = data
    oculto.value = id
    name.value = nombre
    last.value = apellido
    phone.value = telefono
    addres.value = direccion
    doc.value = documento
    emails.value = email
    checkbox.checked = true
    enviar.removeAttribute("disabled")
}

const save = (event)=>{
    let ok = required(event, "form [required]")

    const data = {
        first_name: name.value.trim(),
        apellido_last: last.value.trim(),
        telefono: phone.value.trim(),
        direccion: addres.value.trim(),
        documento: doc.value.trim(),
        email: emails.value.trim(),
    }
    if (ok) {
        if (oculto.value === "") {
            enviar("users",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((data)=>{
               
            })
        }else{
            enviar(`users/${oculto.value}`,{
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((data)=>{
                
            })
        }
    }
}


const edit = (event,element)=>{
    enviar_form(`users/${element.dataset.id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((data)=>{        
        loadForm(data);
        // toggleModal();
    })
}

const createRow = async(data)=>{

    console.log(data);
    
    const documentos = await solicitud("documents")
    const tr = body_tabla.insertRow(-1)

    const trnombre = tr.insertCell(0)
    const trapellido = tr.insertCell(1)
    const trtelefono = tr.insertCell(2)
    const trdireccion = tr.insertCell(3)
    const trdocumento = tr.insertCell(4)
    const tremail = tr.insertCell(5)
    const trgroup = tr.insertCell(6)

    console.log(trnombre);
    
    trnombre.textContent = data.nombre
    trapellido.textContent = data.apellido
    trtelefono.textContent = data.telefono
    trdireccion.textContent = data.direccion
    trdocumento.textContent = data.documento
    tremail.textContent = data.email

    trnombre.classList.add("first_name")
    trapellido.classList.add("last_name")
    trtelefono.classList.add("phone")
    trdireccion.classList.add("addres")
    trdocumento.classList.add("document")
    tremail.classList.add("email")

    const div = document.createElement("div")
    const btn_edit = document.createElement("button")
    const btn_delete = document.createElement("button")

    btn_edit.textContent = "editar"
    btn_delete.textContent = "delete"

    div.classList.add("group")
    btn_edit.classList.add("edit")
    btn_delete.classList.add("delete")

    btn_edit.setAttribute("data-id",data.id)
    btn_delete.setAttribute("data-id",data.id)

    div.appendChild(btn_edit)
    div.appendChild(btn_delete)
    
    trgroup.appendChild(div)

    tr.classList.add(`user_${data.id}`)
}

document.addEventListener("click",(e)=>{
    let element = ""

    if(e.target.matches(".edit") || e.target.matches(".edit *")){
        element = e.target.matches(".edit") ? e.target : e.target.parentNode;
        edit(e,element)
    }
    if(e.target.matches(".delete") || e.target.matches(".delete *")){

    }
});

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
            emails.classList.remove("alert")
            emails.classList.add("good")
        }else{
            console.log("no")
            emails.classList.remove("good")
            emails.classList.add("alert")

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
                email: emails.value
            }
    let respuesta = required(event, "form [required]")
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
                createRow(json)
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


emails.addEventListener("blur",(event)=>{
    correo(event,email)
})
emails.addEventListener("blur",(event)=>{
    letras(event,email)
})


