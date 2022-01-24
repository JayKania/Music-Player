import React from "react";
import { playAudio } from "../utils";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  id,
  audioRef,
}) => {
  // Event Handlers
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const newSongs = songs.map((s) => {
      if (s.id === id) {
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
    await setSongs(newSongs);
    // playAudio(audioRef, setIsPlaying);
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
