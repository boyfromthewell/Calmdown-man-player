import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "../Styles/Playlist.scss";
import { Badge, Form } from "react-bootstrap";
import UpBtn from "./common/UpBtn";

function PlayList() {
  let { id } = useParams();
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  let [videolist, setVideolist] = useState([]);
  let videoID = [];
  let [videoInfo, setVideoInfo] = useState([]);
  let [selected, setSelected] = useState("조회순");

  let filterData = [];

  let today = new Date();
  // 재생목록 내의 모든 동영상 불러오기
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
  // 재생목록 내의 모든 동영상 ID 추출하여, 변수에 저장
  {
    videolist.map((x) => {
      videoID.push("&id=" + x.snippet.resourceId.videoId);
    });
  }
  let videoIDstring = videoID.join("");
  // 추출한 동영상 ID 활용 동영상 조회수, 업로드 날짜 등 가져오기
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

  // select 태그 컨트롤 함수
  const changeControl = (e) => {
    setSelected(e.target.value);
  };
  // 선택한 select 값에 따라 데이터 재렌더링
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
  // 현재 시간과 업로드 시간 계산용 함수
  // (7일 이내에 업로드된 영상이면 return true)
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
// 각각의 유튜브 동영상 렌더링용 컴포넌트
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
      <UpBtn />
    </div>
  );
}
export default PlayList;
