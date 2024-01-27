import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import API from '../utils/API'
import TeacherSignup from '../components/teacherui/teachsignup'
function teacherLoging(){
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [teachername, setTeacherName] = useState('');
  const [Password, setPassword] = useState('');
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
    API.teacherlogin({
      username:userObj.userName,
      password:userObj.Password,
  }).then(data=>{
      console.log(data);
      setIsLoggedIn(true);
      setToken(data.token);
      localStorage.setItem("token",data.token)
      navigate('/profile')
}).catch(err=>{
    console.log(err);
})
}

  const handleSignup = userObj=>{
    API.teachersignup({
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
    document.querySelector('.teacherLogin').style.diplay = "none"
  };


  return (
    <>
    <div className='teahcerlogin'>
      <form onSubmit={e=>handleFormSubmit(e, { userName, Password })}>
        <input
        value={teachername}
        name="teachername"
        onChange={e=> setTeacherName(e.target.value)}
        type="text"
        placeholder="teachername" />
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
      {showSignup && <TeacherSignup subHandle={handleSignup} />}
    </div>
    <div>
      Login with your Github!
    </div>
    </>
  )
}
export default teacherLoging