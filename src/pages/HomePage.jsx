import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/API'
function HomePage() {
  const navigate = useNavigate();
  
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');
  const [token, setToken] = useState("");

  const handleInputChange = (e) => {
  
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

   
     if (inputType === 'userName') {
      setuserName(inputValue);
    }else if (inputType === 'password'){
      setPassword(inputValue)
    }
  };
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

  const handleFormSubmit =   userObj=>{
    API.login({
      username:userObj.userName,
      password:userObj.password,
  }).then(data=>{
      console.log(data);
      setIsLoggedIn(true);
      setToken(data.token);
      localStorage.setItem("token",data.token)
      navigate.push('/profile')
}).catch(err=>{
    console.log(err);
})
}
const handleSignup = userObj=>{
  API.signup({
    userName: userObj.userName,
    email:userObj.email,
    password:userObj.password,
    userstatus: userObj.userstatus,
}).then(data=>{
    console.log(data);
    setIsLoggedIn(true);
    setToken(data.token);
    localStorage.setItem("token",data.token)
}).catch(err=>{
    console.log(err);
})
}

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
              subHandle={handleSignup}
            >
              signup
            </Link>
    </div>
  );
}

export default HomePage;
