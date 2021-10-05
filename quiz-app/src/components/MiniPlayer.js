import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const [playerState, setPlayerState] = useState(false);
  const miniPlayerRef = useRef();

  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  function togglePlayer() {
    if (!playerState) {
      miniPlayerRef.current.classList.remove(classes.floatingBtn);
      setPlayerState(true);
    } else {
      miniPlayerRef.current.classList.add(classes.floatingBtn);
      setPlayerState(false);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer}  ${classes.floatingBtn}`}
      ref={miniPlayerRef}
      onClick={togglePlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={togglePlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        url={videoUrl}
        width="300px"
        height="168px"
        className={classes.player}
        playing={playerState}
        controls
      />
      <p>{title}</p>
    </div>
  );
}
