import {app} from './firebase.js'

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const btnGoogle=document.querySelector("#BtnCAG");
btnGoogle.addEventListener('click', async()=>{

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