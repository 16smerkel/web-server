import React from 'react';
import {useState, useEffect} from 'react';
import '../App.css'
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, updateDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { collection,where,query,getDocs,getDoc, doc, setDoc } from "firebase/firestore"; 

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
const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);


  function PriceCircle()
  {
      let user = firebase.auth().currentUser;
      const _uid = String(user?.uid);
    
      const [message, setMessage] = useState('');
      

      /***************************************************/
      const [groceries, setGroceries] = useState([]);

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
  
      const currSpent= (totalCost).toFixed(2);
    /******************************************************/

     /************Thanks corey lmao*************************/
     const [budget, setBudget] = useState([]);
      const getBudget = async () => {
        firebase.auth().onAuthStateChanged(async(user) => {
          if (user) {
          const docRef = doc(db, "userInfo", user.uid);
          const docSnap = await getDoc(docRef);
          setBudget(docSnap.data().budget);
          }
        })
      } 
      useEffect(() => {
        getBudget();
      });
      useEffect(() => {
        let styleChange = 'conic-gradient(#43A9D5 ' + ((currSpent/budget)) * 100 +'%, #ffffff 0)'
        document.getElementById('cir').style.backgroundImage = styleChange;
      });
      /******************************************* */
      let percent =((currSpent/budget) * 100).toFixed(2) + '%';
     // let styleChange = 'conic-gradient(#43A9D5 ' + ((currSpent/budget)) * 100 +'%, #ffffff 0)'
      //document.getElementById('cir').style.backgroundImage = styleChange;
      
    
    //Update HTML when budget is edited
      const handleKeyDown = event => {
        console.log(event.key);
    
        if (event.key === 'Enter') {
          event.preventDefault();

          let fieldNameElement = document.getElementById('ratio');
          let p = document.getElementById('percent');

          // update ratio div
          fieldNameElement.innerHTML = message;
          
          

          //update percent/circle

          let styleChange = 'conic-gradient(#43A9D5 ' + ((currSpent/budget)) * 100 +'%, #ffffff 0)'
          document.getElementById('cir').style.backgroundImage = styleChange;

          let budgetDouble = parseFloat(message).toFixed(2)
          updateBudget(budgetDouble);

          //window.location.href = '/home'; 
        }
      };

      const updateBudget = async (newBudget) => {
        //"pqVw1D4tTdWi757I0peSBxpzm5n1"
        let q = await (query(collection(db,'userInfo'), where('userID', "==", _uid)));
        const querySnapshot = await getDocs(q);

        let userLocation = 0;
        querySnapshot.forEach((doc) => {
          userLocation = doc.id;
        }); 

        console.log(newBudget);
        if (userLocation != 0) await updateDoc(doc(db, "userInfo",userLocation), {"budget": parseInt(newBudget)});
        

      };

     
      

   return(
    <div name='home' className='w-full h-screen bg-[#fffff]' >
      <br></br>
      <div >
        
        
        <div className ="center">
          
          <input

          className ="submit-button"
          type="text"
          id="message"
          name="message"
          placeholder={`$${budget}`}
          value= {message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        </div>

        <div className="wrap-circles">
          <div className="circle per" id='cir'>
            <div className="inner" id='percent'>{percent}</div>
          </div>
        </div>

        <div className ="center">
            <h1 className = 'submit-button'>
            
              <div><h1 id= "currSpent">{`$${currSpent}`}</h1>&#x2212;<h1  id= "ratio">{`$${budget}`}</h1></div>
            </h1>
        </div>

      </div>
    </div>

   );
};
export default PriceCircle;