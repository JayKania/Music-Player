import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import React from "react";

const Nav = ({
  libraryStatus,
  setLibraryStatus,
  darkModeStatus,
  setDarkModeStatus,
}) => {
  const libraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };
  const darkModeHandler = () => {
    setDarkModeStatus(!darkModeStatus);
  };
  return (
    <nav className={`${darkModeStatus ? "dark-mode-nav" : "light-mode-nav"}`}>
      <h1>Waves</h1>
      <div className="nav-buttons">
        <button onClick={darkModeHandler}>
          {darkModeStatus ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </button>
        <button className="library-button" onClick={libraryHandler}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
