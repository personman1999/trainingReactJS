
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAi_gjG9BN8UQ0vpJ-hcrenYQ7tYfNnQ60",
    authDomain: "maltimart-944aa.firebaseapp.com",
    projectId: "maltimart-944aa",
    storageBucket: "maltimart-944aa.appspot.com",
    messagingSenderId: "494005482905",
    appId: "1:494005482905:web:8c81511d2a327d96e98f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;