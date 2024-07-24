export let numeros = (event,elemento)=>{
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