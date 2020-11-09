import React from "react";
import preloaderGif from "../assets/preloader/preloader.gif";

function Preloader(props) {
  const isPositionAbsolute = props.isPositionAbsolute || false;
  const isCentred = props.isCentred || false;

  return (
    <div
      className={`preloader-container ${
        !isCentred ? `content__preloader-container` : ""
      }${isPositionAbsolute ? `preloader-container_absolute` : ""} ${
        isCentred ? `preloader-container_centred` : ""
      }`}
    >
      <img src={preloaderGif} alt="Loading" className="preloader-img" />
    </div>
  );
}

export default Preloader;
