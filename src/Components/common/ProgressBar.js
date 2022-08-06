import React, { useEffect, useState, useCallback, useRef } from "react";
import "./styles/ProgressBar.scss";
function ProgressBar() {
  const [width, setWidth] = useState(0);
  const progressRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setWidth(0);
      return;
    }
    const windowHeight = scrollHeight - clientHeight;
    const currentPercent = scrollTop / windowHeight;
    setWidth(currentPercent * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <div className="scroll-progress" ref={progressRef}>
      <div className="scroll-progress-bar" style={{ width: width + "%" }}></div>
    </div>
  );
}

export default ProgressBar;
