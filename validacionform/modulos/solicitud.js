async function option(){
    let respuesta = await fetch("http://localhost:3000/documents");
    let datos = await respuesta.json();

    return datos

    // let data = response.json();
    // console.log(data)
    // const select = document.querySelector("select")
    // const fragment = document.createDocumentFragment();
    // data.forEach( x => {
    //     let option = document.createElement("option")
    //     option.textContent = x.nombre;
    //     fragment.appendChild(option)
    // });
    // select.appendChild(fragment)
}
export default option