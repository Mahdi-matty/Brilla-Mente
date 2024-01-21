import React from "react";
import PropTypes from "prop-types";

const getYoutubeVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*v=))([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

const YoutubeEmbed = ({ url }) => {
  const embedId = getYoutubeVideoId(url);

  if (!embedId) {
    return <div>Error: Invalid YouTube URL</div>;
  }
  return (
    <div className="video-responsive">
      <iframe
        width="350"
        height="200"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
YoutubeEmbed.propTypes = {
    url: PropTypes.string.isRequired
  };
  
  export default YoutubeEmbed;