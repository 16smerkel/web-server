import React from 'react';

import { getAuth, signOut  } from "firebase/auth";
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
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

const auth = getAuth();

function LoggedInName()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    const doLogout = event => 
    {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    };    
  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {firstName} 
{lastName}</span><br />
   <button type="button" id="logoutButton" class="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );
};
export default LoggedInName;