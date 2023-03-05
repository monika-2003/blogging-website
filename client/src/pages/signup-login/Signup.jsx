import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { API } from '../../service/api';


function Signup() {

  // other imports

  const navigate = useNavigate();
  const currentInput = useRef();


  // useState hooks

  const[credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  })


  // useEffect Hooks

  useEffect(()=> {
    currentInput.current.focus()
  },[])


  // functions

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
            <input type='text' name='name' placeholder='Enter your name' onChange={handleValueChange} ref={currentInput} />
            <input type='email' name='email' placeholder='Enter your email id' onChange={handleValueChange} />
            <input type='password' name='password' placeholder='Create password' onChange={handleValueChange} />

            <button onClick={handleSignup}>Sign up</button>
            <Link to='/login'>Already a user</Link>
        </div>
    </div>
  )
}

export default Signup