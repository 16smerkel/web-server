import React, { useEffect, useState } from 'react';
import Budget from './Budget';
import Remaining from './Remaining';
import Total from './Total';
import 'bootstrap/dist/css/bootstrap.min.css';
import GroceryList from './GroceryList';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
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
const auth = getAuth();
const db = getFirestore(app);
let user = firebase.auth().currentUser;

function ListDisplay() {
  return (
      <div classname='container'>
      <h1 className='mt-3'>My Budge It! Planner</h1>
      <div className="row mt-4">
        <div className="col-sm">
          <div className='groceryObject'>
          <Budget />
          </div>
        </div>
        <div className="col-sm">  
          <div className='groceryObject'>
          <Remaining />
          </div>
        </div>
        <div className="col-sm"> 
          <div className='groceryObject'>
          <Total />
          </div>
        </div>
      </div>
      <h3 className='mt-3'>Grocery List</h3>
      <div className='row mt-3'>
        <div className='col-sm'>
          <GroceryList />
        </div>
      </div>
    </div>
  );
}

export default ListDisplay;
/*import React from 'react'
import { Checkbox } from '../components/Checkbox';


const ListDisplay = () => {
    const groceries = [
        "Eggs",
        "Salt",
        "Honey from Endangered Bees",
        "Baking Soda",
        "Baked Soda",
        "WillBake Soda"
    ];
    return <div name='list' className='w-full h-screen bg-[#F6F4D3]' >
        <h1>Your Grocery List</h1>
        <div className="groceryContainer">
            {groceries.map(grocery => (
                <Checkbox grocery={grocery}/>
            ))}
        </div>;
    </div>
}

export default ListDisplay
*/

// map goes through all the groceries in the array 
// pass in the grocery items through the checkbox component
