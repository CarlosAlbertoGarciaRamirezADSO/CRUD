let dom = document;
const validar = (event, form) => {  
    event.preventDefault();
    let elementos = dom.querySelectorAll(form)
    let bandera = true; 
    elementos.forEach(elemento =>{
        if (elemento.value === "" ) {
            elemento.classList.add("alert")
            bandera = false;
        }
    })
    return bandera   
}
export default validar