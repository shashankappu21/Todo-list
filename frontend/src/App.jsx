import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {
  Link,
  Route,
  Routes
} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Mainpage from './components/Mainpage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/main" element={
          <PrivateRoute>
          <Mainpage />
          </PrivateRoute>
        } 
        />
      </Routes>
    </div>
  )
}

export default App
