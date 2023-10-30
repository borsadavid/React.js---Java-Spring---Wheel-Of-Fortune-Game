import React, {useContext, useState} from 'react'
import {AppContext} from '../App'
import Register from '../functions/Register';

export default function RegisterPage(){

  const {setRegister} = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    Register(username, password, setRegister);
  };

  return (
    <div className='games centered log-in-width'>
      <h1 className='mid-text'>Register</h1>
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
      <button className="custom-button" onClick={handleRegister}>Create Account</button>
      <br/>
      Go back to login?
      <br/>
      <button className="custom-button" onClick={(event) => { event.preventDefault(); setRegister(false); }}>Return</button>
    </div>
  );

}
