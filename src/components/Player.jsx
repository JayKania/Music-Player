import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { playAudio } from "../utils";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setSongs,
}) => {
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;

    // calculate percenttage
    const roundCurrent = Math.round(current);
    const roundDuration = Math.round(duration);
    const roundAnimationPerecentage = Math.round(
      (roundCurrent / roundDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: roundAnimationPerecentage,
    });
  };

  const dragHandler = (event) => {
    // console.log(event.target.value);
    const current = event.target.value;
    setSongInfo({ ...songInfo, currentTime: current });
    audioRef.current.currentTime = current;
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextIndex = 0;

    if (direction === "skip-back") {
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : songs.length - 1;
      await setCurrentSong(songs[nextIndex]);
    } else {
      nextIndex = currentIndex + 1 >= songs.length ? 0 : currentIndex + 1;
      await setCurrentSong(songs[nextIndex]);
    }
    activeLibrarySongHandler(nextIndex);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const activeLibrarySongHandler = (nextIndex) => {
    const newSongs = songs.map((s) => {
      if (s.id === songs[nextIndex].id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const songEndHandler = () => {
    skipTrackHandler("skip-forward");
  };

  // utility function
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
          ></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
        ></FontAwesomeIcon>
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
