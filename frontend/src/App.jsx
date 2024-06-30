import { useState } from 'react'
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import ForgotPassword from './pages/forgotpassword.jsx';
import Dashboard from './pages/dashboard.jsx';
import DeleteUser from './pages/deleteuser.jsx';
import EditUser from './pages/edituser.jsx';
import {Route, Routes} from 'react-router-dom';
import Chat from './pages/chat.jsx';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard/user/:id' element={<Dashboard />} />
      <Route path='/dashboard/user/delete/:id' element={<DeleteUser />} />
      <Route path='/dashboard/user/edit/:id' element={<EditUser />} />
      <Route path='/dashboard/chat/:id' element={<Chat  />} />
    </Routes>
  )
}

export default App;
