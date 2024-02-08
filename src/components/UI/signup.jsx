import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword]=useState('');
  const [authCode, setAuthCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const generateAuthCode = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.subHandle({
      username,
      email,
      password,
    })
  }

  return (
    <footer>
      <div className='githubRes'>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={username}
          name="username"
          onChange={e=>setUserName(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          name="email"
          onChange={e=> setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          name="password"
          onChange={e=> setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <button type="submit">
          Submit
        </button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
        </div>
    </footer>
  );
};

export default Signup;