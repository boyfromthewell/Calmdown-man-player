import React from "react";
import { Link } from "react-router-dom";
// 검색 Input
const SearchBar = ({ updateChange, search, setSearch }) => {
  return (
    <div className="search">
      <input
        className="seacrh-bar"
        style={{
          width: "100%",
          height: "50px",
          maxWidth: "600px",
          border: "1px solid #4b89dc",
          borderRadius: "12px",
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

export default SearchBar;
