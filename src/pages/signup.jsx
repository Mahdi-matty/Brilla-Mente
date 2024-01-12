import React from 'react';
import { checkPassword, validateEmail } from '../utils/helper';
import { useState } from 'react';
const signup = () => {
    const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword]=useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'userName') {
      setUserName(inputValue);
    }else if (inputType === 'password'){
      setPassword(inputValue)
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');
      return;
    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      return;
    }

    setUserName('');
    setPassword('');
    setEmail('');
    alert(`Hello ${userName}`);
  };
  return (
    <footer>
      <div className='githubRes'>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={userName}
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="userName"
        />
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
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

export default signup;