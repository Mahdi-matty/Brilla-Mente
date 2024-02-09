import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/API'
import Signup from '../components/UI/signup';
import { FaGithub } from 'react-icons/fa';
import '../css/homePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');
  const [token, setToken] = useState("");
  const [githubusername, setGithubUserName] = useState('');
  const [githubpassword, setGithubPassword] = useState('');
  const [githubemail, setGithubEmail] = useState('');
  const [loggedin, setIsLoggedIn] = useState(false)
  const URL_PREFIX = 'http://localhost:3001'

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

  const CLIENT_ID ='560f1c16a1a52dfe50c0' 
  function loginWithgithub(){
    window.location.assign('https://github.com/login/oauth/authorize?client_id='+CLIENT_ID)
  }

  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code')

    if (codeParams && (localStorage.getItem('AccessToken') === null)){
      async function getAccessToken(){
        await fetch(`${URL_PREFIX}/getAccessToken?code=1`+ codeParams, {
          method: 'GET'
        }).then((Response)=>{
          return Response.json()
        }).then((data)=>{
          if (data.access_token){
            localStorage.setItem('AccessToken', data.access_token)
            console.log(data.access_token)
          }
        })
      } getAccessToken();
    }
  }, [])


  useEffect(() => {
    console.log(githubemail);
    console.log(githubpassword);
    if (githubemail&& githubpassword&& githubusername){
        githubUserProcess()
    }
  }, [githubemail, githubpassword, githubusername]);

  async function getUserData(){
    await fetch(`${URL_PREFIX}/getUserData`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
      }}).then((response)=>{
        return response.json();
      }).then((data)=>{
        console.log(data.login)
        setGithubUserName(data.login)
        console.log(githubusername)
        setGithubEmail(`${data.login}@github.com`)
        console.log(githubemail)
        console.log(data.id)
        setGithubPassword(`${data.id}`)
        console.log(githubpassword)
      })
  }

  const githubUserProcess = async ()=>{
    try {
      const response = await fetch(`${URL_PREFIX}/api/students`)
      const data= await response.json()
      console.log(data)
      const matchingUser = data.filter(user => user.username === githubusername);
      console.log(matchingUser[0])
      if (matchingUser[0]){
        const userObj= {
          githubusername,
          githubpassword
        }
        API.login({
          username:userObj.githubusername,
          password:userObj.githubpassword,
        }).then(data=>{
          console.log(data);
          setIsLoggedIn(true);
          setToken(data.token);
          localStorage.setItem("token",data.token)
          navigate('/profile')
        }).catch(err=>{
        console.log(err);
        })
      }else {
        const userObj ={
          githubusername,
          githubpassword,
          githubemail
        }
        API.signup({
          username : userObj.githubusername,
          password : userObj.githubpassword,
          email : userObj.githubemail
        }).then((data)=>{
          setIsLoggedIn(true);
          setToken(data.token);
          localStorage.setItem("token",data.token)
          navigate('/profile')
        }).catch(err=>{
          console.log(err);
        })
      }
    }catch(error){
    console.log(error)
    }
  }

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
      navigate('/profile')
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
    <>
      <div className='loginPage'>
        <div className="loginDivCont">
          <img src="src\assets\Logo.png" alt="Logo" className='logoImage'/>
          <h1>
          Welcome to Brilla Mente!
          </h1>
          <div className='loginOptions'>
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
            <div className='gitHubOption'>
              <h2>Or login with Github</h2>
              <img src='src\assets\github.png' onClick={loginWithgithub} className='gitHubLogo'/>
              <button onClick={getUserData}>Get User Data</button>
            </div>            
          </div>
          <button onClick={toggleSignup} className="signUpButton">
            Signup
          </button>
          {showSignup && <Signup subHandle={handleSignup} />}
        </div>
        <div className='teacherLog'>
          <Link to='/teacherlogin'>
            <button>
              Teachers
            </button></Link>
        </div>
      </div>     
    </>   
  );
}

export default HomePage;
