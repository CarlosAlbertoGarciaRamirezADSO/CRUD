
export async function lista(){
    let response = await fetch("http://localhost:3000/users")
    let datos = await response.json();
    
    return datos
}