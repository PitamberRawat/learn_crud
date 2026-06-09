
import React, { useState } from 'react'
import axios from 'axios';

const AuthPage = ({ setUser }) => {

    const API_URL = "http://localhost:3100/api"
    const [isLoginClicked, setIsLoginClicked] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');

    const checkAuth = async () => {
        if (isLoginClicked) {
            try{
                const res = await axios.post(`${API_URL}/auth/login`, { email, password });
                setUser(true);
            }catch(err){
                console.log(err);
            }
         }else{
            try{
                const res = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
                setUser(true);
            }catch(err){
                console.log(err);
            }
         }
    }

    const switchToRegister = () => {
        setIsLoginClicked(false);
        setEmail('');
        setPassword('');
        setName('');
    }

    const switchToLogin = () => {
        setIsLoginClicked(true);
        setEmail('');
        setPassword('');
        setName('');
    }

    return (
        <div className='auth-page'>
            <h1>Login / Register</h1>
            <p>Enter credentials to access your account</p>

            <div className='button-container'>
                <button className='button login-button' onClick={() => setIsLoginClicked(true)}>Login</button>
                <button className='button register-button' onClick={() => setIsLoginClicked(false)}>Register</button>
            </div>

            {isLoginClicked && <div className="form-container login-container">
                <input type="email" placeholder="Enter email" className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter password" className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='button login-button' onClick={() => checkAuth()}>Login</button>
                <p>Don't have an account? <span className='register-link' onClick={switchToRegister}>Register</span></p>
            </div>}

            {!isLoginClicked && <div className="form-container register-container">
                <input type="text" placeholder="Enter name" className='input-field' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Enter email" className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter password" className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
                <select name="role" id="role" className='input-field' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className='button register-button' onClick={() => checkAuth()}>Register</button>
                <p>Already have an account? <span className='login-link' onClick={switchToLogin}>Login</span></p>
            </div>}
        </div>
    )
}

export default AuthPage
