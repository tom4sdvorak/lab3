// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuHnjYv9F0HdHs8J39lx5sOlT8_qQB0u4",
  authDomain: "courselabwork-c0080.firebaseapp.com",
  projectId: "courselabwork-c0080",
  storageBucket: "courselabwork-c0080.appspot.com",
  messagingSenderId: "634241080023",
  appId: "1:634241080023:web:9dba76ae907fa34f72ae92",
  measurementId: "G-3WMKDS7JYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export async function loginUser(username: string, password: string){
    try {
        const res = await signInWithEmailAndPassword(auth, username, password);
        console.log(res);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function registerUser(username: string, password: string){
    try {
        const res = await createUserWithEmailAndPassword(auth, username, password);
        console.log(res);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function signUserOut(){
    return await signOut(auth);
}

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, function(user) {
            if(user){
                resolve(user);   
            }
            else {
                resolve(null);
            }
            unsub();
        })
    })
    
}
