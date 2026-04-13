import React, { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {

    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const preventFormSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password });
        navigate("/");
    }

    if (loading) {
        return <main className='loading'>Loading...</main>
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login<span>.</span></h1>
                <form onSubmit={preventFormSubmit}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='Enter email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder='Enter password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div >
                    <button className='primary-button' type='submit' >Login</button>
                    <p>Don't have an account? <Link to="/register">Register Now</Link></p>

                </form>
            </div>
        </main>
    )
}

export default Login