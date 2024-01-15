import React from 'react';
import { checkPassword, validateEmail } from '../utils/helper';
import { useState } from 'react';
const signup = () => {
    const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword]=useState('');
  const [authCode, setAuthCode] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  const generateAuthCode = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
      };

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

  const handleFormSubmit = async (e) => {
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
    const authCode = generateAuthCode();
    setAuthCode(authCode);
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          authCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending email. Please try again.');
      }

      console.log('Email sent with authentication code');
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage('Error sending email. Please try again.');
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
          name="userName"
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