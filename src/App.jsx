import { useRef, useState } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkModeStatus, setDarkModeStatus] = useState(false);
  // Ref
  const audioRef = useRef(null);
  return (
    <div
      className={`App ${libraryStatus ? "library-active " : ""}${
        darkModeStatus ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="container">
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          darkModeStatus={darkModeStatus}
          setDarkModeStatus={setDarkModeStatus}
        />
        <Song currentSong={currentSong} darkModeStatus={darkModeStatus} />
        <Player
          songs={songs}
          setSongs={setSongs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          darkModeStatus={darkModeStatus}
          audioRef={audioRef}
        />
        <Library
          libraryStatus={libraryStatus}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setSongs={setSongs}
          darkModeStatus={darkModeStatus}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
}

export default App;
