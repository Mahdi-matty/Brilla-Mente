import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Signup = (props) => {
    const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword]=useState('');
  const [authCode, setAuthCode] = useState(null);
  const [userstatus, setUsrStatus] = useState('studnet');
  
  const [errorMessage, setErrorMessage] = useState('');

  const generateAuthCode = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
      };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.subHandle({
      userName,
      email,
      password,
      userstatus
    })
  }

  return (
    <footer>
      <div className='githubRes'>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={userName}
          name="userName"
          onChange={e=>setUserName(e.target.value)}
          type="text"
          placeholder="userName"
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
        <select value={userstatus} onChange={e=> setUsrStatus(e.target.value)}>
        <option value='student'>Student</option>
        <option value='teacher'>Teacher</option>
        </select>
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