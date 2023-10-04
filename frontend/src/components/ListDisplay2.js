import React, { useEffect, useState } from 'react';
import Budget from './Budget';
import Remaining from './Remaining';
import Total from './Total';
import 'bootstrap/dist/css/bootstrap.min.css';
import GroceryList from './GroceryList';
import AddGroceryForm from './AddGroceryForm';
import Todo from './Todo';
import { query, collection, doc, deleteDoc, onSnapshot} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import UserInfo from './UserInfo';
import Grocery from './Grocery';

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

function ListDisplay2() {
   
  const [userInfo, setUserInfo] = useState([]);


  // instead of reading in every single userInfo's budget how do i specifically just grab the user that is logged in and work with their budget 
  
  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'userInfo'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let userInfoArr = []
      querySnapshot.forEach((doc) => {
        userInfoArr.push({...doc.data(), id: doc.id})
      });
      setUserInfo(userInfoArr);
    }) // takes a snapshot of databse in firebase and reads it to computer to be read out on screen
    return () => unsubscribe()
  },[])


  return (
    <>
      <ul className='list-group mt-3 mb-3'>
        {userInfo.map((userInfo)=>(
          <UserInfo
            userInfo={userInfo}/>
          ))}
      </ul>
    </>
  );
}

export default ListDisplay2;