import { useState } from 'react';
import './style.css';

function HomePage() {
  // Here we set two state variables for firstName and lastName using `useState`
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    return name === 'username' ? setuserName(value) : setPassword(value);
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Alert the user their first and last name, clear the inputs
   
    setuserName('');
    setPassword('');
  };

  return (
    <div className="container text-center">
      <h1>
      login!
      </h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={userName}
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="userName"
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
      <signup/>
    </div>
  );
}

export default HomePage;
