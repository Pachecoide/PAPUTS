import {app} from './firebase.js'

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const auth = getAuth(app);

const btnOut=document.querySelector("#cerrar");
btnOut.addEventListener('click', async(e)=>{
e.preventDefault();

)};



const btnGoogle=document.querySelector("#BtnCAG");
btnGoogle.addEventListener('click', async(e)=>{
e.preventDefault();
  const provider = new GoogleAuthProvider();
    try {
        const credencial=await signInWithPopup(auth, provider)
        user=credencial.user;
        console.log(credencial)
        Swal.fire({
            icon: 'success',
        title: 'Secces',
        text: 'You logged in',
    })
    if(user){
        container.innerHTML=`<h1>${user.auth.displayName}</h1>`
        Bbody.innerHTML=`
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" id="bp" aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="cerrar" href="#" data-bs-toggle="modal" data-bs-target="#">Sign out</a>
            </li>
          </ul>
        `
        const uid=user.uid;
    }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'Don´t is possible login whit google in this moment',
              })
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
            Bbody.innerHTML=`
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" id="bp" aria-current="page" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="cerrar" href="#" data-bs-toggle="modal" data-bs-target="#">Sign out</a>
                </li>
              </ul>
            `
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