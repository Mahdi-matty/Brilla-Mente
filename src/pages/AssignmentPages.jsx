import YoutubeEmbed from "../components/youtubetest/youtube"
import React from "react"
import { useState } from "react";
import '../css/assignmentpage.css'
import { AuthProvider } from "../utils/Authcontext";
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
    const tokenn = localStorage.getItem('tokrn')

  const handleShareButtonClick = () => {
    setShowSharePopup(!showSharePopup);
  };

  return (
    <div>
      <h1>My React App</h1>
      <YoutubeEmbed url={youtubeUrl} />
      <button onClick={handleShareButtonClick}>Share</button>
      {showSharePopup && (
        <div className="share-popup">
          <WhatsappShareButton url={sharebale}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={sharebale}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          
        </div>
      )}
    </div>
  );
}

export default AssignmentPage