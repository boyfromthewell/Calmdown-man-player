import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./Playlist.scss";
import { Badge, Form } from "react-bootstrap";

function PlayList() {
  let { id } = useParams();
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  let [videolist, setVideolist] = useState([]);
  let videoID = [];
  let [videoInfo, setVideoInfo] = useState([]);
  let [selected, setSelected] = useState("조회순");

  let filterData = [];

  let today = new Date();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${key}`
      )
      .then((res) => {
        console.log(res);
        setVideolist(res.data.items);
      })
      .catch(() => {});
  }, []);
  {
    videolist.map((x) => {
      videoID.push("&id=" + x.snippet.resourceId.videoId);
    });
  }
  let videoIDstring = videoID.join("");

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${videoIDstring}&maxResults=50&key=${key}`
      )
      .then((res) => {
        console.log(res);
        setVideoInfo(res.data.items);
      })
      .catch(() => {});
  }, [videolist]);
  const changeControl = (e) => {
    setSelected(e.target.value);
  };
  function selectRender(value) {
    if (value === "조회순") {
      filterData = videoInfo
        .sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)
        .map((x) => {
          return x;
        });
    } else if (value === "최신순") {
      filterData = videoInfo
        .sort(
          (a, b) =>
            new Date(b.snippet["publishedAt"]) -
            new Date(a.snippet["publishedAt"])
        )
        .map((x) => {
          return x;
        });
    } else if (value === "오래된 순") {
      filterData = videoInfo
        .sort(
          (a, b) =>
            new Date(a.snippet["publishedAt"]) -
            new Date(b.snippet["publishedAt"])
        )
        .map((x) => {
          return x;
        });
    }
  }
  function getDate(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
  
    let diffDate = date1.getTime() - date2.getTime();
    if (Math.abs(diffDate / (1000 * 3600 * 24)) < 7) {
      return true;
    }
  }
  return (
    <div className="video-container">
      <div className="select">
        <Form.Select size="sm" onChange={changeControl}>
          <option value="조회순">조회순</option>
          <option value="최신순">최신순</option>
          <option value="오래된 순">오래된 순</option>
        </Form.Select>
      </div>
      <div></div>
      {selectRender(selected)}
      {filterData.map((item) => {
        return <VideoInfo x={item} today={today} getDate={getDate} />;
      })}
    </div>
  );
}
function VideoInfo({ x, today, getDate }) {
  return (
    <div className="video">
      <Link to={"/video/" + x.id}>
        <img src={x.snippet.thumbnails.medium["url"]} alt="" />
        <h3>
          {x.snippet.title}{" "}
          {Number(x.statistics.viewCount) > 500000 ? (
            <Badge bg="danger">추-천</Badge>
          ) : null}{" "}
          {getDate(x.snippet["publishedAt"], today) ? (
            <Badge bg="primary">New</Badge>
          ) : null}
        </h3>
      </Link>
      <p className="viewCount">
        조회수 : {Number(x.statistics.viewCount).toLocaleString("en-US")} 회
      </p>
      <p className="upload">
        업로드 : {x.snippet["publishedAt"].substring(0, 10)}{" "}
      </p>
    </div>
  );
}
export default PlayList;
