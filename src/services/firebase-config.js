import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importa Firebase Storage

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJzE60zYWMwn253FJokCUUICjh5_skw-4",
  authDomain: "sena-4690a.firebaseapp.com",
  projectId: "sena-4690a",
  storageBucket: "sena-4690a.appspot.com", // Asegúrate de tener el storageBucket
  messagingSenderId: "582806120567",
  appId: "1:582806120567:web:b4270d05b6fca5537fbe72",
  measurementId: "G-ZF6M7SM7HK",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app); // Exporta Firebase Storage
