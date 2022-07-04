import React, { useEffect, useState, useCallback } from "react";
import "../App.css";
import insta from "../images/insta.png";
import twitch from "../images/twitch.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Modules/Pagenation";
import Loading from "./Modules/Loading";
import SearchBar from "./Modules/SearchBar";
import "../Styles/Home.scss";

function Home() {
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
    <>
      <p className="made-by">
        made by{" "}
        <a target="_blank" href="https://www.instagram.com/sooooonyong.e/">
          <img src={insta} alt="" width="30" height="30" />
        </a>
      </p>
      <p className="twitch">
        방송 보기
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
    </>
  );
}

export default Home;
