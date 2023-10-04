import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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

const auth = getAuth();

function Login() {
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState('');
  const notVerifiedNotify = (e) => toast(loginName.value + ' has not been verified.', 5000)
  const authFailNotify = (e) => toast('Invalid Email/Password', 5000)

  const doLogin = async (event) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(auth, loginName.value, loginPassword.value)
        .then((userCredential) => {
          let thisUser = firebase.auth().currentUser;
          if (thisUser.emailVerified) {
            // email is verified.
            // Signed in
            const user = userCredential.user;
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
            window.location.href = '/home'; 
          } else {
            notVerifiedNotify();
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email" || "auth/wrong-password") {
            authFailNotify();
          }
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <section className='form-section'>
      <form onSubmit={doLogin}>
        <img className='logo-center' src='/assets/BudgeItLogo.png' />
        <div className='container-block'>
          <h1 className='heading'>Login</h1>

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
              id='loginButton'
              value='Login'
              onClick={doLogin}
            />
          </div>
          <br></br>
          <div className='labelReg float'>
            <a href='/register'>Register</a>
          </div>
          <div className='labelReg float'>
            <a href='/resetPassword'>Forgot your password?</a>
          </div>
        </div>
      </form>
      <span id='loginResult'>{message}</span>
    </section>
  );
}
export default Login;
