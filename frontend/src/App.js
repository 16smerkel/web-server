import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import List from './pages/List';
import Shop from './pages/Shop';
import About from './pages/About';
import RateUs from './pages/RateUs';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AppProvider } from './components/AppContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<LoginPage />} />
        <Route path='/register' index element={<RegisterPage />} />
        <Route path='/resetPassword' index element={<ResetPasswordPage />} />
      </Routes>

      <Routes>
        <Route path='/home' index element={<Home />} />
        <Route path='/about' index element={<About />} />
        <Route path='/shop' index element={<Shop />} />
        <Route path='/list' index element={<List />} />
        <Route path='/rateus' index element={<RateUs />} />
      </Routes>
    </BrowserRouter>
  );
} 
export default App;