import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginData';
import { API } from '../../service/api';
import './Login.css';


function Login({isUserAuthenticated}) {

  const navigate = useNavigate();
  const {setAccount} = useContext(LoginContext);

  const [loginCred, setLoginCred] = useState({
    email: '',
    password: ''
  })

  const handleLoginValues = async(e) => {
    setLoginCred({...loginCred, [e.target.name]: e.target.value})
  }

  const handleLogin = async() => {
    let response = await API.userLogin(loginCred);

    if(response.isSuccess) {
      setAccount({name: response.data.name, email: response.data.email})
      console.log(response.data.name)
      navigate('/')

      isUserAuthenticated(true);
      
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('refreshToken',response.data.refreshToken);
    }
  }


  return (
    <div className='login-form-container'>
        <div className='form'>
            <h1>Login</h1>
            <input type='email' name = 'email' placeholder='Email Id' onChange={handleLoginValues} />
            <input type='password' name = 'password' placeholder='Password' onChange={handleLoginValues}/>

            <button onClick={handleLogin}>Login</button>

            <Link to='/signup'>Create a new account</Link>
        </div>
    </div>
  )
}
 
export default Login