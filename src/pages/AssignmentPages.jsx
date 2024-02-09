import YoutubeEmbed from "../components/youtubetest/youtube"
import React from "react"
import { useState } from "react";
import '../css/assignmentpage.css'
import { AuthProvider } from "../utils/Authcontext";
import SideNav from '../components/sidenav'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,

  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  MailruIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

function AssignmentPage(){
    const youtubeUrl = "https://www.youtube.com/watch?v=cX8Z7BEq25A";
    const sharebale = 'http://localhost:3000/assignments'
    const [showSharePopup, setShowSharePopup] = useState(false);
    const tokenn = localStorage.getItem('tokrn');
    const newyoutube = 'https://www.youtube.com/watch?v=47yVbdReyXw'
    const socrate = 'https://www.youtube.com/watch?v=_VTdup6dQI0&pp=ygUPc29jcmF0aWMgbWV0aG9k'

  const handleShareButtonClick = () => {
    setShowSharePopup(!showSharePopup);
  };

  return (
    <>
    <SideNav />
    <div className="videoContainer">
  <div className="videoItem">
    <h2>What is a flash card?</h2>
    <YoutubeEmbed url={youtubeUrl} />
  </div>
  <div className="videoItem">
    <h2>Flash card tutorial </h2>
    <YoutubeEmbed url={newyoutube}/>
  </div>
  </div>
  <div className="videoContainer">
    <div className="videoItem">
      <h2>What is Socratic Method?</h2>
      <YoutubeEmbed url={socrate} />
    </div>
  </div>
      
    </>
    
  );
}

export default AssignmentPage