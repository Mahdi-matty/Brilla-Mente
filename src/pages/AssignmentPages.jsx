import YoutubeEmbed from "../components/youtubetest/youtube"
import React from "react"
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

    return (
      <div>
        <h1>My React App</h1>
        <YoutubeEmbed url={youtubeUrl} />
        <h3>what is going on?</h3>
        <WhatsappShareButton url={'http://localhost:3000/assignments'}>
          <WhatsappIcon />
        </WhatsappShareButton>
      </div>
    );
  };

export default AssignmentPage