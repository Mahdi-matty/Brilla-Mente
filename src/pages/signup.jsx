import React from 'react';
import { useState } from 'react';
const signup = (props) => {
    const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword]=useState('');
  const [authCode, setAuthCode] = useState(null);
  const [userstatus, setUsrStatus] = useState('studnet');

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
    try {
      const authCode = generateAuthCode();
      setAuthCode(authCode);
      await props.subHandle({
        userName,
        email,
        password,
        userstatus,
      });
      setUserName('');
      setPassword('');
      setEmail('');
      setUsrStatus('student');
    } catch (error) {
    console.error("Signup error:", error.message);
    setErrorMessage("Error during signup. Please try again.");
  }
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

export default signup;