import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { API } from '../../service/api';


function Signup() {

  const navigate = useNavigate();

  const[credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleValueChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSignup = async() => {
    let response = await API.userSignup(credentials);

    if(response.isSuccess) {
      navigate('/login')
    }
  }

  return (
    <div className='login-form-container'>
        <div className='form'>
          <h1>Signup</h1>
            <input type='text' name='name' placeholder='Enter your name' onChange={handleValueChange} />
            <input type='email' name='email' placeholder='Enter your email id' onChange={handleValueChange} />
            <input type='password' name='password' placeholder='Create password' onChange={handleValueChange} />

            <button onClick={handleSignup}>Sign up</button>
            <Link to='/login'>Already a user</Link>
        </div>
    </div>
  )
}

export default Signup