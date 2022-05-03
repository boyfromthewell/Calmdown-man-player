import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Styles/player.scss";
function VideoPlayer() {
  let { videoID } = useParams();
  // React-player 라이브러리 이용 유튜브 동영상 재생
  let videoLink = "https://youtube.com/watch?v=" + videoID;
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
