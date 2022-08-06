import React from "react";
import dogAdmin from "../../images/dog-admin-zero.gif";

function Loading() {
  return (
    <div className="loading">
      <img src={dogAdmin} alt="" />
      <p>로딩중...</p>
    </div>
  );
}

export default Loading;
