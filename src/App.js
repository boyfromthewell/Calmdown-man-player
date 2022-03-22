import "./App.css";
import "./Main.scss";
import logo from "./images/logo.jpg";
import insta from "./images/insta.png";
import twitch from "./images/twitch.svg";
import dogAdmin from "./images/dog-admin-zero.gif";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import PlayList from "./PlayList";
import VideoPlayer from "./VideoPlayer";

function App() {  
  const key=process.env.REACT_APP_YOUTUBE_API_KEY;

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCUj6rrhMTR9pipbAWBAMvUQ&maxResults=50&key=${key}`
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
        setLoading(false);
      })
      .catch(() => {});
  }, []);
  console.log(playlist);

  return (
    <div className="App">
      <div className="nav-bar">
        <img alt="" src={logo} width="40" heigth="40" className="logo" />
        <Link to="/">개방장 플레이어</Link>
      </div>
      <Switch>
        <Route exact path="/">
          <p className="made-by">
            made by{" "}
            <a target="_blank" href="https://www.instagram.com/sooooonyong.e/">
              <img src={insta} alt="" width="30" height="30" />
            </a>
          </p>
          <p className="twitch">
            개방장 본진
            <a target="_blank" href="https://www.twitch.tv/zilioner">
              <img src={twitch} alt="" width="30" height="30" />
            </a>
          </p>
          <div className="container">
            {loading ? <Loading /> : null}
            {playlist &&
              playlist.slice(offset, offset + limit).map((i, idx) => {
                return (
                  <div className="playlist" key={idx}>
                    <img src={i.snippet.thumbnails.high["url"]} alt="" />
                    <Link to={"/playlist/" + i.id}>
                      <h2>{i.snippet.localized["title"]}</h2>
                    </Link>
                    <p>{i.snippet.localized["description"]}</p>
                  </div>
                );
              })}
          </div>
          <Pagination
            total={playlist.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </Route>
        <Route path="/playlist/:id">
          <PlayList />
        </Route>
        <Route path="/video/:videoID">
          <VideoPlayer />
        </Route>
      </Switch>
    </div>
  );
}
function Loading() {
  return (
    <div className="loading">
      <img src={dogAdmin} alt="" />
      <p>로딩중...</p>
    </div>
  );
}
function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <div className="page-btn">
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            variant="outline-primary"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </Button>
        ))}
    </div>
  );
}

export default App;
