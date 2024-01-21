import YoutubeEmbed from "../components/youtubetest/youtube"
import React from "react"

function AssignmentPage(){
    const youtubeUrl = "https://www.youtube.com/watch?v=cX8Z7BEq25A";

    return (
      <div>
        <h1>My React App</h1>
        <YoutubeEmbed url={youtubeUrl} />
      </div>
    );
  };

export default AssignmentPage