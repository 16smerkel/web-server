import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZzJ19x9w2KCvMUyl32VA7yhk2dCJtGho',
  authDomain: 'cop4331-large-project.firebaseapp.com',
  databaseURL: 'https://cop4331-large-project-default-rtdb.firebaseio.com',
  projectId: 'cop4331-large-project',
  storageBucket: 'cop4331-large-project.appspot.com',
  messagingSenderId: '924437295908',
  appId: '1:924437295908:web:b5583990a6c428aa5db9b1',
  measurementId: 'G-GP0BEWQ2BJ  ',
};
firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const EditBudget = (props) => {
    const [value, setValue] = useState();
    const finish = () => props.handleSaveClick(value);
    let userId = firebase.auth().currentUser.uid;
    const setBudget = async (event) => {
        let budget = Number(value);
        await setDoc(doc(db, "userInfo", userId), {
            budget: budget,
        }, { merge: true });
        finish();
    }
    return (
        <div>
            <input
                required='required'
                type='number'
                class='form-control mr-3'
                id='name'
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
            ></input>
            <button
                type='button'
                class='btn btn-primary'
                onClick={setBudget}
            >
                Save
            </button>
        </div>
    );
};

export default EditBudget;