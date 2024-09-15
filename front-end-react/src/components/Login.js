import React, { useEffect } from 'react'
import { useState } from 'react'
import authService from '../services/authService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
 
    if (user && user.id && user.token){
      
      window.location.href=`/employee-reports/${user.id}`
    }
    console.log("working")
  }, [])
  

  const handleOnLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await authService.login(email, password)
      // Handle successful login
      console.log('Login successful:', user)
      window.location.href = `/employee-reports/${user.id}`
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error)
      toast.error('Wrong Email or Password : ' + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      
    }
  }

  return (
    <div className='wrapper bg-dark w-50'>
      <h1>Login</h1>
      <form action=''>
        <div className='input-box'>
          <input
            type='email'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button class='w-50' type='submit' onClick={handleOnLogin}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default LoginForm
