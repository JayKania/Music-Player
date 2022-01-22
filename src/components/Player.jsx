import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

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

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
    });
  };

  // required to change the pause icon to play icon when audio ends
  useEffect(() => {
    if (songInfo.currentTime === songInfo.duration) {
      // playSongHandler();
      setIsPlaying(false);
    }
  }, [songInfo]);

  const dragHandler = (event) => {
    // console.log(event.target.value);
    const current = event.target.value;
    setSongInfo({ ...songInfo, currentTime: current });
    audioRef.current.currentTime = current;
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextIndex = 0;
    console.log(currentIndex);
    if (direction === "skip-back") {
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : songs.length - 1;
      setCurrentSong(songs[nextIndex]);
    } else {
      nextIndex = currentIndex + 1 >= songs.length ? 0 : currentIndex + 1;
      setCurrentSong(songs[nextIndex]);
    }
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

    // catch is necessary beacuse when audio ends and if we change the track we face a error
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audioRef.current.play();
          setIsPlaying(true);
        })

        .catch(() => {
          audioRef.current.play();
          setIsPlaying(true);
        });
    }
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
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
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
      ></audio>
    </div>
  );
};

export default Player;
