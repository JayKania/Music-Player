// catch is necessary beacuse when audio ends and if we change the track we face a error
export const playAudio = (audioRef, setIsPlaying) => {
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
