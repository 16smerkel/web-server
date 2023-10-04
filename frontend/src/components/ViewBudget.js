import React, {useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {query, collection, onSnapshot, doc, addDoc, getDoc, getDocs, deleteDoc} from 'firebase/firestore';
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

const ViewBudget = (props) => {
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

	return (
		<>
			<span>Budget: ${budget}</span>
			<button type='button' class='btn btn-primary' onClick={props.handleEditClick}>
				Edit
			</button>
		</>
	);
};

export default ViewBudget;