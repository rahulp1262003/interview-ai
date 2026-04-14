import React, { useState } from 'react'
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const preventFormSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
  }

  if (loading) {
    return <main className='loading'>Loading...</main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register<span>.</span></h1>
        <form onSubmit={preventFormSubmit}>
          <div className='input-group'>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='Enter username' required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' placeholder='Enter email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='primary-button' type='submit'>Register</button>
          <p>Already have an account? <Link to="/login">Login Now</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register