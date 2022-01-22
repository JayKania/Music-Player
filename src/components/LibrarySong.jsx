import React from "react";

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
  const songSelectHandler = () => {
    setCurrentSong(song);
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
