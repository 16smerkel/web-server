import React, { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import '../App.css';
import toast from 'react-simple-toasts';

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

function Login() {
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState('');
  const verifyNotify = (e) => toast('Please check ' + loginName.value + ' for verification email.', 5000);
  const weakPassNotify = (e) => toast('Password must be at least 6 characters.', 5000);
  const emailTakenNotify = (e) => toast('This email is already in use.', 5000);

  const doSignup = async (event) => {
    event.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, loginName.value, loginPassword.value)
        .then (async() => {
          let newUser = firebase.auth().currentUser;
          await setDoc(doc(db, "userInfo", newUser.uid+""), {
            budget: 0.0,
            timeScope: 10000,
            userEmail: loginName.value,
            userID: newUser.uid,
            list: [],
            hasReviewed: false,
          });
        })
        .then((userCredential) => {
          let newUser = firebase.auth().currentUser;
          newUser
            .sendEmailVerification()
            .then(function () {
              // Email sent.
              verifyNotify();
            })
            .catch(function (error) {
              // An error happened.
            })
          //original method for storing user info
          const user = userCredential.user;
          localStorage.setItem('user_data', JSON.stringify(user));
          setMessage('');
          //window.location.href = '/home';
          // ...
        })
        .catch((error) => {
          if (error.code === "auth/weak-password") {
            weakPassNotify();
          }
          else if (error.code === "auth/email-already-in-use"){
            emailTakenNotify();
          }
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <section className='form-section'>
      <form>
        <img className='logo-center' src='/assets/BudgeItLogo.png' />
        <div className='container-block'>
          <h1 className='heading'>Register</h1>

          <div className='center'>
            <div className='input-block'>
              <label className='label'>Username *</label>
              <input
                className='wrong-input'
                type='text'
                id='loginName'
                placeholder='Username'
                ref={(c) => (loginName = c)}
              />
              <br />
            </div>

            <div className='input-block'>
              <label className='label'>Password *</label>
              <input
                className='wrong-input'
                type='password'
                id='loginPassword'
                placeholder='Password'
                ref={(c) => (loginPassword = c)}
              />
              <br />
            </div>
          </div>

          <div className='submit-button-wrapper'>
            <input
              className='submit-button'
              type='submit'
              id='signupButton'
              value='Sign up'
              onClick={doSignup}
            />
          </div>

          <br></br>
          <div className='labelReg float'>
            <a href='/'>Login</a>
          </div>
        </div>
      </form>
      <span id='loginResult'>{message}</span>
    </section>
  );
}
export default Login;
