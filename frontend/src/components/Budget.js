import EditBudget from './EditBudget';
import ViewBudget from './ViewBudget';
import React, { useState, useEffect } from 'react';
import {query, collection, where, getDocs, doc, updateDoc} from 'firebase/firestore';
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

const Budget = () => {

    
    let user = firebase.auth().currentUser;
    const _uid = String(user?.uid);

    
    const [budget, setBudget] = useState();
    // MAKE BUDGET SAVE IN FIREBASE SO IT CAN BE USED AS BUDGET VARIABLE IN BUDGET.JS and also in REMAINING.JS
    // right now it like disappears when you go to a different page and doesnt cooperate with remianing.js because
    // the remaining.js doesnt have the budget variable woorking with firebase (just like budget.js)


    const updateBudget = async (newBudget) => {
        //"pqVw1D4tTdWi757I0peSBxpzm5n1"
        let q = await (query(collection(db,'userInfo'), where('userID', "==", _uid)));
        const querySnapshot = await getDocs(q);
  
        let userLocation = 0;
        querySnapshot.forEach((doc) => {
          userLocation = doc.id;
        }); 
  
        console.log(newBudget);
        if (userLocation != 0) await updateDoc(doc(db, "userInfo",userLocation), {"budget": newBudget});
        setBudget(newBudget);
      };
      
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (value) => {
        updateBudget(value);
        setIsEditing(false);
    };

    return (
        <div class='alert alert-secondary p-4 d-flex align-items-center justify-content-between'>
            {isEditing ? (
                <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
            ) : (
                <ViewBudget handleEditClick={handleEditClick} budget={budget} />
            )}
        </div>
    );
};

export default Budget;

/*
let user = firebase.auth().currentUser;
    const _uid = String(user?.uid);

    
    const [isEditing, setIsEditing] = useState(false);
  
    const [message, setMessage] = useState('');
    var fieldNameElement = document.getElementById('ratio');
    var p = document.getElementById('percent');
    
    let budget = 1;
    var currSpent = 1;

    const updateBudget = async (newBudget) => {
      //"pqVw1D4tTdWi757I0peSBxpzm5n1"
      let q = await (query(collection(db,'userInfo'), where('userID', "==", _uid)));
      const querySnapshot = await getDocs(q);

      let userLocation = 0;
      querySnapshot.forEach((doc) => {
        userLocation = doc.id;
      }); 

      console.log(newBudget);
      if (userLocation != 0) await updateDoc(doc(db, "userInfo",userLocation), {"budget": newBudget});

    };

    

    //Update HTML when budget is edited
    const handleKeyDown = event => {
        console.log(event.key);
    
        if (event.key === 'Enter') {
          event.preventDefault();

          // update ratio div
          fieldNameElement.innerHTML = message;
          budget = message;

          let budgetDouble = parseFloat(message).toFixed(2)
          updateBudget(budgetDouble);
          
        }
      };


    
 return(
  <div name='home' className='w-full h-screen bg-[#fffff]' >
    <br></br>
    <div >

        <div class='alert alert-secondary p-3 d-flex align-items-center justify-content-between'>
            <input
                required='required'
                type='number'
                class='form-control mr-3'
                value={parseFloat={message}}
                onChange={(event) => setMessage(event.target.value)} 
                onKeyDown={handleKeyDown}
            />
        </div>
      

      </div>
      </div>
    );
};

*/