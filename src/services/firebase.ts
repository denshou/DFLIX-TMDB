import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyD3yZXsJ2pPFSGbBs7GZb8cN5F4lFKFLRI",
    authDomain: "dflix-73a5c.firebaseapp.com",
    projectId: "dflix-73a5c",
    storageBucket: "dflix-73a5c.firebasestorage.app",
    messagingSenderId: "386593667687",
    appId: "1:386593667687:web:a34776c9b666974143b2c2",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const db = getFirestore(app);