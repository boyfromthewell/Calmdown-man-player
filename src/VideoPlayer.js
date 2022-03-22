import React from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./player.scss";
function VideoPlayer() {
  let { videoID } = useParams();
  console.log(videoID);
  let videoLink = "https://youtube.com/watch?v=" + videoID;
  console.log(videoLink);
  return (
    <>
      <ReactPlayer
        className="player"
        url={videoLink}
        controls
        playing={true}
        width="100%"
        height="88vh"
      />
      <div>
        <Button
          variant="primary"
          onClick={() => window.open(videoLink, "_blank")}
        >
          원본 영상 링크
        </Button>
      </div>
    </>
  );
}
export default VideoPlayer;
