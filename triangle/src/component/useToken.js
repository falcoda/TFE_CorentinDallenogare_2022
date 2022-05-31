import { useState } from 'react';


// This component is used to login the user
// This component comes from a tutorial
// https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
    document.location.reload(true);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;