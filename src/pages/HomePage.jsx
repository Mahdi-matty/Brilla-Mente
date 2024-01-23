import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/API'
import Signup from '../components/UI/signup';
function HomePage() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');
  const [token, setToken] = useState("");
 const [loggedin, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    if(savedToken){
      API.getDataFromToken(savedToken).then(userData=>{
        setToken(savedToken);
        setIsLoggedIn(true)
    }).catch(err=>{
      localStorage.removeItem("token");
    })
  }
},[])

  const handleFormSubmit = (e)=> {
    e.preventDefault();
   const userObj = {
    userName,
    Password
   }
    API.login({
      username:userObj.userName,
      password:userObj.Password,
  }).then(data=>{
      console.log(data);
      setIsLoggedIn(true);
      setToken(data.token);
      localStorage.setItem("token",data.token)
      navigate('/profile', { state: { token: data.token } })
}).catch(err=>{
    console.log(err);
})
}
const handleSignup = userObj=>{
  API.signup({
    username: userObj.username,
    email:userObj.email,
    password:userObj.password,
}).then(data=>{
    console.log(data);
    setIsLoggedIn(true);
    setToken(data.token);
    localStorage.setItem("token",data.token)
}).catch(err=>{
    console.log(err);
})
}
const toggleSignup = () => {
  setShowSignup(!showSignup);
  document.querySelector('.formLogin').style.diplay = "none"
};



  return (
    <div className="container text-center loginDivCont">
      <h1>
      login!
      </h1>
      <form className="formLogin" onSubmit={e=>handleFormSubmit(e, { userName, Password })}>
        <input
          value={userName}
          name="userName"
          onChange={e=> setuserName(e.target.value)}
          type="text"
          placeholder="userName"
        />
        <input
          value={Password}
          name="password"
          onChange={e=> setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">
          Login
        </button>
      </form>
      <button onClick={toggleSignup} className="badge bg-primary rounded-pill">
        Signup
      </button>
      {showSignup && <Signup subHandle={handleSignup} />}
    </div>
  );
}

export default HomePage;
