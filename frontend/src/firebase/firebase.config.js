
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,  
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
//Firebase te ayuda a crear la parte de autenticación (auth) en tu aplicación, pero no es un "backend" completo por sí mismo.
//Con Firebase Authentication, puedes gestionar el registro, inicio de sesión y autenticación de usuarios de manera fácil, incluyendo múltiples métodos como correo electrónico/contraseña, Google, Facebook, etc. 
//Firebase se encarga de la parte de autenticación, validación y seguridad, mientras que tú no necesitas crear un backend tradicional para manejar estas funcionalidades.