import React, { useEffect, useState } from 'react';
import SearchTableRow from './SearchTableRow';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import {query, collection, onSnapshot, doc, addDoc, deleteDoc, setDoc} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import toast from 'react-simple-toasts';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, arrayUnion } from "firebase/firestore";
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
function ShopSearch() {  

  const [groceries, setGroceries] = useState([]);
  
  const [filteredData, setFilteredData] = useState([]);

  
  // Create grocery
  const addGrocery = async (e, grocery) => {
    e.preventDefault(e)

    let userId = firebase.auth().currentUser.uid;
    let name = grocery.name;
    let store = grocery.store;
    let amount = 1;
    let cost = grocery.cost;
    let json = JSON.stringify({name: name, price: cost, amount: amount, location: store});

    await setDoc(doc(db, "userInfo", userId+""), {
        list: arrayUnion(json)
    }, { merge: true });

    const notify = (e) => toast(grocery.name + ' priced at $' + grocery.cost + ' from ' + grocery.store + ' has been added to list!', 5000)
    notify();
  }


    // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let groceriesArr = []
      querySnapshot.forEach((doc) => {
        groceriesArr.push({...doc.data(), id: doc.id})
      });
      setGroceries(groceriesArr);
    }) // takes a snapshot of databse in firebase and reads it to computer to be read out on screen
    return () => unsubscribe()
  },[])

  const handleFilter = (event) => {
    const searchWord = event.target.value; 
    const newFilter = groceries.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord == "") {
        setFilteredData([])
    }
    else{
        setFilteredData(newFilter);
    }
};

    return (
    <div className='app-container'>
        <div className='search'>
        <Container>
            <h1 className='text-center mt-4'>Items Nearby Search</h1>
            <Form>
                <InputGroup className='my-3 border border-black'>
                    <Form.Control onChange={handleFilter}></Form.Control>
                </InputGroup>
            </Form>
        </Container>
        </div>
        <form>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Store</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {filteredData.map((grocery) => (
                    <SearchTableRow grocery={grocery}
                    addGrocery={addGrocery}/>
                ))}
            </tbody>
        </table>
        </form>
      
    </div>
    );
  };
  
  export default ShopSearch;
/*import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchTableRow from './SearchTableRow';
import { AppContext } from './AppContext';
import data from './Data.json';


function ShopSearch() {  
    const { dispatch } = useContext(AppContext);  // always declare AppProvider in App.js to work
    const [groceries, setGroceries] = useState(data);
  
    const [addGroceryId, setAddGroceryId] = useState(null);

    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value; 
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord == "") {
            setFilteredData([])
        }
        else{
            setFilteredData(newFilter);
        }
    };

  
    const handleAddClick = (event, grocery) => {
      event.preventDefault();
      setAddGroceryId(grocery.id);
  
      const newGrocery = {
        id: uuidv4(),
        name: grocery.name,
        store: grocery.store,
        cost: grocery.cost
      }

      
      alert('the ' + newGrocery.name + ' that costs $' + grocery.cost + ' has been added to your grocery list!');
  
      dispatch({
        type: 'ADD_GROCERY',
        payload: newGrocery,
    });
}

 
    return (
    <div className='app-container'>
        <div className="search">
            <Container>
            <h1 className='text-center mt-4'>Items Nearby Search</h1>
            <Form>
                <InputGroup className='my-3 border border-lightblue'>  
                    <Form.Control placeholder='Search' onChange={handleFilter}></Form.Control>
                </InputGroup>
            </Form>
        </Container>
        </div>
        <form>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Store</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {filteredData.map((grocery) => (
                    <SearchTableRow grocery={grocery}
                    handleAddClick={handleAddClick}/>
                ))}
            </tbody>
        </table>
    </form>
    </div>
    );
  };

  )
}

export default ShopSearch
*/