import { useState } from 'react';
import axios from "axios";
import "../css/login.css"

function Login(props) {

    const [loginForm, setloginForm] = useState({email: "",password: ""});

    function setLogin(event) {
      axios({
        method: "POST",
        url:"/api/Login",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
        props.setAuth(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
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