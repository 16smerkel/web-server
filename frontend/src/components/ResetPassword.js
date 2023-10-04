import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
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

function ResetPassword() {
  let userEmail;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();

  const notify = (e) => toast('A password reset email has been to ' + userEmail.value + ' if a user with this email exists.', 5000)
  const triggerResetEmail = async (e) => {
    e.preventDefault();
    notify();
    await sendPasswordResetEmail(auth, userEmail.value);
  };

  return (
    <section className='form-section'>
      <form>
        <img className='logo-center' src='/assets/BudgeItLogo.png' />
        <div className='container-block'>
          <h1 className='heading'>Reset Password</h1>

          <div className='center'>
            <div className='input-block'>
              <label className='label'>Email *</label>
              <input
                className='wrong-input'
                type='text'
                id='email'
                placeholder='Email'
                ref={(c) => (userEmail = c)}
              />
              <br />
            </div>
          </div>

          <div className='submit-button-wrapper'>
            <input
              className='submit-button'
              type='submit'
              id='resetButtonButton'
              value='Reset Password'
              onClick={triggerResetEmail}
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

export default ResetPassword;
