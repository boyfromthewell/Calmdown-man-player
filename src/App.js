import React from "react";
import "./App.css";
import logo from "./images/logo.jpg";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import PlayList from "./Components/PlayList";
import VideoPlayer from "./Components/VideoPlayer";
import ProgressBar from "./Components/common/ProgressBar";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <div className="nav-container">
          <img alt="" src={logo} width="40" heigth="40" className="logo" />
          <Link to="/">침착맨 플레이어</Link>
        </div>

        <ProgressBar />
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
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

export default App;
