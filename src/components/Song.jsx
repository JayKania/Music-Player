import React from "react";

const Song = ({ currentSong, darkModeStatus }) => {
  return (
    <div
      className={`song-container ${
        darkModeStatus ? "dark-mode-song" : "ligh-mode-song"
      }`}
    >
      <img src={currentSong.cover} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
