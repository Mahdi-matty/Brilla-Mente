import React from 'react';
import { useState, useEffect } from 'react';
const TeacherSignup = (props) => {
    const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword]=useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  

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
      <div className='teachersignupRes'>
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

export default TeacherSignup;