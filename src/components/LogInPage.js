import React, {useContext, useState} from 'react'
import {AppContext} from '../App'
import LogIn from '../functions/LogIn';

export default function LogInPage() {

  const {setJWT, setRegister} = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    LogIn(username, password, setJWT);
  };

  return (
    <div className='games centered log-in-width'>
      <h1 className='mid-text'>Login</h1>
      <h1 className='small-text'>Username</h1>
      <input
        className='register-input'
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <h1 className='small-text'>Password</h1>
      <input
        className='register-input'
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br/>
      <button className="custom-button" onClick={handleLogIn}>Log In</button>
      <br/>
      Don't have an account?
      <br/>
      <button className="custom-button" onClick={(event) => { event.preventDefault(); setRegister(true); }}>Register</button>
    </div>
  );

}