import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  // Here we set two state variables for firstName and lastName using `useState`
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
   
     if (inputType === 'userName') {
      setuserName(inputValue);
    }else if (inputType === 'password'){
      setPassword(inputValue)
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate.push('/profile');
    // Alert the user their first and last name, clear the inputs
   
    setuserName('');
    setPassword('');
  };

  return (
    <div className="container text-center loginDivCont">
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
          value={Password}
          name="password"
          onChange={handleInputChange}
          type="text"
          placeholder="password"
        />
        <button type="submit">
          Login
        </button>
      </form>
      <Link
              to={`signup`}
              className="badge bg-primary rounded-pill"
            >
              signup
            </Link>
    </div>
  );
}

export default HomePage;
