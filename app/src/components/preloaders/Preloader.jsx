import React from 'react';

function Preloader() {
  return (
    <div className="preloader-container content__preloader-container">
      <img
        src="/assets/preloader/preloader.gif"
        alt="Loading"
        className="preloader-img"
      />
    </div>
  );
}

export default Preloader;
