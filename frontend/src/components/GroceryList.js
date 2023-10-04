import React, { useContext, useState, useEffect } from 'react';
import {query, collection, onSnapshot, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import Grocery from './Grocery';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, arrayUnion, arrayRemove } from "firebase/firestore";
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

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);
  const [filteredGroceries, setfilteredGroceries] = useState(groceries || []);

  useEffect(() => {
    setfilteredGroceries(groceries);
  }, [groceries]);

  // Read todo from firebase
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
  });
  // Delete grocery
  const deleteGrocery = async (id) => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user){
        const docRef = doc(db, "userInfo", user.uid);
        const docSnap = await getDoc(docRef);
        const list = docSnap.data().list;

        let listArr = [];
        for (let i = 0; i < docSnap.data().list.length; i++){
          const item = JSON.parse(docSnap.data().list[i]);
          listArr.push({...item, id: i});
        }

        let name = listArr[id].name;
        let store = listArr[id].location;
        let amount = listArr[id].amount;
        let cost = listArr[id].price;
        let json = JSON.stringify({name: name, price: cost, amount: amount, location: store});
        
        await setDoc(doc(db, "userInfo", user.uid), {
          list: arrayRemove(json)
        }, { merge: true });
      }
    })
  }

  const popUpAlert = (id) => {

    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to remove this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteGrocery(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const handleChange = (event) => {
    const searchResults = groceries.filter((filteredGrocery) =>
    filteredGrocery.name.toLowerCase().includes(event.target.value) || filteredGrocery.store.toLowerCase().includes(event.target.value) 
    );
    setfilteredGroceries(searchResults);
  };

  return (
    <>
      <ul className='list-group mt-3 mb-3'>
        {filteredGroceries.map((grocery)=>(
          <Grocery
            grocery={grocery}
            popUpAlert={popUpAlert}
            deleteGrocery={deleteGrocery}/>
          ))}
      </ul>
    </>
  );
};

export default GroceryList;
/*
import React, { useContext, useState, useEffect } from 'react';
import GroceryItem from './GroceryItem';
import { AppContext } from '../context/AppContext';

const GroceryList = () => {
    const { groceries } = useContext(AppContext);

    const [filteredGroceries, setfilteredGroceries] = useState(groceries || []);

    useEffect(() => {
        setfilteredGroceries(groceries);
    }, [groceries]);

    const handleChange = (event) => {
        const searchResults = groceries.filter((filteredGrocery) =>
        filteredGrocery.name.toLowerCase().includes(event.target.value) || filteredGrocery.store.toLowerCase().includes(event.target.value) 
        );
        setfilteredGroceries(searchResults);
    };

    return (
        <>
            <input
                type='text'
                class='form-control mb-2 mr-sm-2'
                placeholder='Type to search...'
                onChange={handleChange}
            />
            <ul className='list-group mt-3 mb-3'>
                {filteredGroceries.map((grocery)=>(
                    <GroceryItem 
                        id={grocery.id}
                        name={grocery.name}
                        store={grocery.store}
                        cost={grocery.cost}/>
                ))}
            </ul>
        </>
    );
};

export default GroceryList;
import React, { useContext, useState, useEffect } from 'react';
import GroceryItem from './GroceryItem';
import { AppContext } from './AppContext';

const GroceryList = () => {
    const { groceries } = useContext(AppContext);

    const [filteredGroceries, setfilteredGroceries] = useState(groceries || []);

    useEffect(() => {
        setfilteredGroceries(groceries);
    }, [groceries]);

    const handleChange = (event) => {
        const searchResults = groceries.filter((filteredGrocery) =>
        filteredGrocery.name.toLowerCase().includes(event.target.value) || filteredGrocery.store.toLowerCase().includes(event.target.value) 
        );
        setfilteredGroceries(searchResults);
    };

    return (
        <>
            <input
                type='text'
                class='form-control mb-2 mr-sm-2'
                placeholder='Type to search...'
                onChange={handleChange}
            />
            <ul className='list-group mt-3 mb-3'>
                {filteredGroceries.map((grocery)=>(
                    <GroceryItem 
                        id={grocery.id}
                        name={grocery.name}
                        store={grocery.store}
                        cost={grocery.cost}/>
                ))}
            </ul>
        </>
    );
};

export default GroceryList;*/
