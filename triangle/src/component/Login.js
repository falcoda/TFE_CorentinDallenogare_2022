import { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "../css/login.css"

function Login(props) {
  // This component is used to login the user
  // The user can log in with his email and password
  const [loginForm, setloginForm] = useState({email: "",password: ""});
  const history = useNavigate(); 
  function setLogin(event) {
    // This function is use to call the api to login the user
    axios({
      method: "POST",
      url:"/api/Login",
      data:{
        email: loginForm.email,
        password: loginForm.password
        }
    })
    .then((response) => {
      // if success
      // the access token is saved in the local storage
      props.setToken(response.data.access_token);
      toast.success("Connexion réussie");
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementsByClassName("tourColor")[0].classList.add("active");
      history("/");
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error("Erreur d'authentification");
        }
    })

    setloginForm(({
      email: "",
      password: ""}))

    event.preventDefault();
  }

  function handleChange(event) { 
    const {value, name} = event.target;
    setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div className='loginPage'>
      <h1 className='loginTitle'>Login</h1>
        <form className="loginForm row">
          <div className="col-12 loginInput">
            <input onChange={handleChange} 
              type="email"
              text={loginForm.email} 
              name="email" 
              placeholder="Email" 
              value={loginForm.email} 
              className="inputLogin" />
          </div>
          
          <div className="col-12 loginInput">
            <input onChange={handleChange} 
                type="password"
                text={loginForm.password} 
                name="password" 
                placeholder="Password" 
                value={loginForm.password}
                className="inputLogin"/>
          </div>
          
          <div className="col-12 ">
            <button onClick={setLogin} className="buttonLogin">Submit</button>
          </div>
      </form>
    </div>
  );
}

export default Login;