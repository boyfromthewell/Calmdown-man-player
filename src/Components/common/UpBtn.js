import React from "react";
import "./styles/UpBtn.scss";
import Chim from "../../images/dog-admin1.png";
function UpBtn() {
  const scrollToTop = (e) => {
    if (!window.scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button className="up-btn" onClick={scrollToTop}>
        <img src={Chim} alt="up-btn" />
        <span>🔼</span>
      </button>
    </>
  );
}

export default UpBtn;
