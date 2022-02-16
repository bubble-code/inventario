import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'; 

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem('AuthToken');
    navigate('/');
  }
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = localStorage.getItem('AuthToken');
    if (authToken) {
      navigate('/home')
    }
    if (!authToken) {
      navigate('/register')
    }
  }, [])

  return (
    <div>
      Home page
      <Button handleAction={handleLogout} title='Logout'/>
    </div>
  )
}