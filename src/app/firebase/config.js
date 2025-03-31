import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBawZLicAm3wnZTYOK0EcHQ9vCqiqI7cmc",
    authDomain: "train-3328b.firebaseapp.com",
    databaseURL: "https://train-3328b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "train-3328b",
    storageBucket: "train-3328b.firebasestorage.app",
    messagingSenderId: "393792473153",
    appId: "1:393792473153:web:cc0da16a3e5d8c26dd5ec0",
    measurementId: "G-RHG2LYDRM4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();