import { useState } from 'react'
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import ForgotPassword from './pages/forgotpassword.jsx';
import {Route, Routes} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  )
}

export default App;
