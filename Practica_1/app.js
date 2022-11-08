const cargarPosts=async()=>{
    let url="https://jsonplaceholder.typicode.com/posts";
    const api=await fetch (url);
    const data=await api.json();
    console.log(data);
    tabla=document.querySelector("#lista");
    data.map(item=>{
        tabla.innerHTML+=`
        <tr>
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal"> <i class="bi bi-pencil-square"></i> Editar</button></td>
        <td><button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-backspace m-2"></i>Eliminar</button></td>
        </tr>`;
    })
}

const addpost=async ()=>{
    //Objeto js-->
let titulo=document.querySelector("#titulo").value;
let body=document.querySelector("#body").value;
const post={titulo:titulo,body:body,userId:1};

    
    const api=await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(post),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
const respuesta=await api.json();
console.log(respuesta)

tabla=document.querySelector("#lista");
tr=document.createElement("tr");
tr.innerHTML=`
<th scope="row">${respuesta.id}</th>
        <td>${respuesta.titulo}</td>
        <td>${respuesta.body}</td>
        <td><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal"> <i class="bi bi-pencil-square"></i> Editar</button></td>
        <td><button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-backspace m-2"></i>Eliminar</button></td>
        `
tabla.appendChild(tr);
if(respuesta!=null){
    Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Something went wrong!',
    
      })
}else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    
      })
}
}