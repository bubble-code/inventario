import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem('AuthToken');
  };
  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {    
    localStorage.setItem('AuthToken', userToken)
    setToken(userToken);
  }
  return {
    setToken: saveToken,
    token: token
  }
}