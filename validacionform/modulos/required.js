let dom = document;
let require = dom.querySelectorAll("[required]")

console.log("required",require);

export let required =function hola() {   
    require.forEach(elemento =>{
        if (elemento.value === "") {
            elemento.classList.add("alert")
            
        }
    })
}