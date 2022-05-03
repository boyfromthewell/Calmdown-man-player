import "./App.css";
import logo from "./images/logo.jpg";
import insta from "./images/insta.png";
import twitch from "./images/twitch.svg";
import dogAdmin from "./images/dog-admin-zero.gif";
import axios from "axios";
import React, { useEffect, useState, useCallback, memo } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import PlayList from "./Components/PlayList";
import VideoPlayer from "./Components/VideoPlayer";
import "./Main.scss";

function App() {
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CHANNEL_ID = "UCUj6rrhMTR9pipbAWBAMvUQ";
  const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}`;

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  let [search, setSearch] = useState([]);
  // 모든 재생목록 불러오기 위한 nextPageToken 값 저장
  const nextPageToken = ["CDIQAA", "CGQQAA", "CJYBEAA"];
  // 침착맨 재생목록 불러오기
  useEffect(() => {
    axios
      .all([
        axios.get(
          `${YOUTUBE_API_URL}&pageToken=CDIQAQ&maxResults=50&key=${key}`
        ),
        axios.get(
          `${YOUTUBE_API_URL}&pageToken=${nextPageToken[0]}&maxResults=50&key=${key}`
        ),
        axios.get(
          `${YOUTUBE_API_URL}&pageToken=${nextPageToken[1]}&maxResults=50&key=${key}`
        ),
        axios.get(
          `${YOUTUBE_API_URL}&pageToken=${nextPageToken[2]}&maxResults=50&key=${key}`
        ),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          const data1 = res1.data.items;
          const data2 = res2.data.items;
          const data3 = res3.data.items;
          const data4 = res4.data.items;
          const res = [...data1, ...data2, ...data3, ...data4];
          setPlaylist(res);
          setLoading(false);
        })
      )
      .catch(() => {});
  }, []);
  // 검색어 자동 완성 구현 함수
  const updateChange = useCallback(
    (e) => {
      let data = e.target.value;
      let filterData = playlist.filter((i) => i.snippet.title.includes(data));
      if (data.length === 0) {
        filterData = [];
      }
      setSearch(filterData);
    },
    [search]
  );

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
            <SearchBar
              updateChange={updateChange}
              setSearch={setSearch}
              search={search}
            />
            {/*침착맨 재생 목록 렌더링*/}
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
// Loading UI
function Loading() {
  return (
    <div className="loading">
      <img src={dogAdmin} alt="" />
      <p>로딩중...</p>
    </div>
  );
}
// 페이지네이션 컨트롤
const Pagination = memo(({ total, limit, page, setPage }) => {
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
});
// 검색 Input
const SearchBar = ({ updateChange, search, setSearch }) => {
  return (
    <div className="search">
      <input
        className="seacrh-bar"
        style={{
          width: "100%",
          height: "40px",
          maxWidth: "600px",
          border: "1px solid white",
        }}
        placeholder="즉-시 검색"
        onChange={(e) => updateChange(e)}
      ></input>
      <div className="search-box">
        {search.map((item) => {
          return (
            <>
              <div className="search-result">
                <Link to={"/playlist/" + item.id}>
                  <p onClick={() => setSearch([])}>{item.snippet.title}</p>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default App;
