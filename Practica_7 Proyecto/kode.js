import {app} from './firebase.js'

import { getAuth,
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
    signInWithEmailAndPassword,
    onAuthStateChanged,
     signInWithPopup,
     signInAnonymously,
     signOut
    } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


   

let user=null;
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{

  const container=document.querySelector("#container");
  checarEstado(user);
  if(user){
    container.innerHTML=`
    <h2>${user.displayName}</h2>
    <p> ${user.email}</p><br>
    
    <button class="btn btn-outline-success" id="btnAdd" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-check"></i>Add Register</button>
      <table class="table" onload="onGetAlumnos()">
        <thead class="table table-dark table-hover">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
            <th scope="col">QR CODE</th>
          </tr>
        </thead>
        <tbody id="lista">
        </tbody>
      </table>
      <!--End table crud-->
    `
    const uid=user.uid;
  }else{
    container.innerHTML=`<h1>Pleace login</h1>`
  }

})


const btnAn=document.querySelector("#BtnAn");
btnAn.addEventListener('click', async(e)=>{
e.preventDefault();
    try {
        const result=await signInAnonymously(auth);
        user=result.user;
        const modalInstance = bootstrap.Modal.getInstance(btnAn.closest('.modal'));
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'Don´t is possible login in this moment',
              })
    }

});



const btnGoogle=document.querySelector("#BtnCAG");
btnGoogle.addEventListener('click', async(e)=>{
e.preventDefault();
  const provider = new GoogleAuthProvider();
    try {
        const credencial=await signInWithPopup(auth, provider)
        user=credencial.user;
        const modalInstance = bootstrap.Modal.getInstance(btnGoogle.closest('.modal'));
        modalInstance.hide();
        checarEstado(user);
        console.log(credencial)
        Swal.fire({
            icon: 'success',
        title: 'Secces',
        text: 'You logged in',
        
    })
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'Don´t is possible login whit google in this moment',
              })
    }

});

const checarEstado=(user=null)=>{
  console.log(user);
  if(user==null){
    document.querySelector("#iniciar").style.display="block";
    document.querySelector("#crear").style.display="block";
    document.querySelector("#cerrar").style.display="none";
  }
  else{
    document.querySelector("#iniciar").style.display="none";
    document.querySelector("#crear").style.display="none";
    document.querySelector("#cerrar").style.display="block";
  }
}



const btClose=document.querySelector("#cerrar");
btClose.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    await signOut(auth)
    checarEstado()
  }catch(error){
    console.log(error)
  }
});


const btnIniciar=document.querySelector("#BtnI");
btnIniciar.addEventListener('click', async(e)=>{
e.preventDefault();
const email=document.querySelector("#Iemail");
const password=document.querySelector("#IPass");
console.log(email.value,password.value);
try {
    const res=await signInWithEmailAndPassword(auth, email. value, password.value)
    console.log(res);
    Swal.fire({
        icon: 'success',
    title: 'Secces',
    text: 'You logged in',
        
     })
    var myModalEl = document.getElementById ('modLog');
        var modal=bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    const resII= await onAuthStateChanged (auth, (user)=>{
        const container=document.querySelector("#container");
        const Bbody=document.querySelector("#Bbody");
        if(user){
            container.innerHTML=`<h1>${user.email}</h1>`
            
            document.querySelector("#iniciar").style.display="none";
            document.querySelector("#crear").style.display="none";
            const uid=user.uid;
        }else{
container.innerHTML=`<h1>Don´t have user</h1>`
        }

          })
} catch (error) {
    Swal.fire({
        icon: 'error',
       title: 'Ops...',
        text: 'Check your email or password',
          })
}

});

const btncrearcuenta=document.querySelector("#btncrear")

btncrearcuenta.addEventListener('click', async(e)=>{
    e.preventDefault();
const email=document.querySelector("#crearemail");
const password=document.querySelector("#crearcontra");
console.log(email.value,password.value);
var myModalEl=document.getElementById('crearModal');
var modal=bootstrap.Modal.getInstance(myModalEl)

try{
    const respuesta=await createUserWithEmailAndPassword (auth, email.value, password.value)
console.log(respuesta.user);
Swal.fire({
    icon: 'success',
    title: 'Secces',
    text: 'Is created your account',

  })
  email.value='';
  password.value=''
  modal.hide();
}catch (error){
console.log(error.code);
const code=error.code;
if (code=='auth/invalid-email'){
    Swal.fire({
        icon: 'error',
       
        text: 'Invalid email',
          })
}
if (code=='auth/weak-password'){
    Swal.fire({
        icon: 'error',
       
        text: 'Invalid password',
          })
}
if (code=='auth/email-already-in-user'){
    Swal.fire({
        icon: 'error',
       
        text: 'This email is in use',
          })
}
}

});