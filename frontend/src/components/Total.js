import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZzJ19x9w2KCvMUyl32VA7yhk2dCJtGho",
  authDomain: "cop4331-large-project.firebaseapp.com",
  databaseURL: "https://cop4331-large-project-default-rtdb.firebaseio.com",
  projectId: "cop4331-large-project",
  storageBucket: "cop4331-large-project.appspot.com",
  messagingSenderId: "924437295908",
  appId: "1:924437295908:web:b5583990a6c428aa5db9b1",
  measurementId: "G-GP0BEWQ2BJ  "
};
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const Total = () => {
    const [groceries, setGroceries] = useState([]);
    
   // const [budget, setBudget] = useState([]);
   const budget = 0;  // MAKE ME WORK!!!!!!!!!!!!!!!!!

   const getGroceryList = async () => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        const docRef = doc(db, "userInfo", user.uid);
        const docSnap = await getDoc(docRef);
        let groceriesArr = [];
        for (let i = 0; i < docSnap.data().list.length; i++){
          const item = JSON.parse(docSnap.data().list[i]);
          groceriesArr.push({...item, id: i});
        }
        setGroceries(groceriesArr);
      }
    })
   } 

    useEffect(() => {
        getGroceryList();
    })

    const totalCost = groceries.reduce((total, item) => {
        return (total += item.price);
    }, 0);

    const finalTotal = (totalCost).toFixed(2);

    return (
        <div className="alert alert-primary p-4">
            <span>Spent so far: ${finalTotal}</span>
        </div>
    );
};

export default Total;