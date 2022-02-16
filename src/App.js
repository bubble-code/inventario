import './App.css';
import React, { useEffect } from 'react';
import useToken from './Hook/SessionHook';
import Form from './componet/common/Form';
import Home from './componet/PrivatePage/Home'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { app } from './ConfigFirebase/firebse_config'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useToken();

  useEffect(() => {
    console.log(token)
    if (token) {
      navigate('/home')
      console.log(token)
    }
  }, [])
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 'register') {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response)
          navigate('/home')
          setToken(response._tokenResponse.refreshToken)
        }).catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in use');
          }
          console.log(error)
        })
    }
    if (id === 'login') {
      signInWithEmailAndPassword(authentication, email, password).then((response) => {        
        navigate('/home')
        setToken(response._tokenResponse.refreshToken)
      }).catch(error => {
        console.log(error)
        if (error.code === 'auth/wrong-password') {
          toast.error('Please check the password')
        }
        if (error.code === 'auth/user-not-found') {
          toast.error('Please check the Email');
        }
      })
    }
  }
  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Form title="Login" setPassword={setPassword} setEmail={setEmail} handleAction={() => handleAction('login')} />} />
          <Route path="/register" element={<Form title="Register" setPassword={setPassword} setEmail={setEmail} handleAction={() => handleAction('register')} />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
