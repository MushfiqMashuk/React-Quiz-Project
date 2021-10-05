import { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  
  const getKeyword = useMemo(() => {
    const percentage = (score / (noq * 5)) * 100;

    if (percentage < 50) {
      return "failed";
    } else if (percentage < 75) {
      return "good";
    } else if (percentage < 100) {
      return "nice";
    } else {
      return "excellent";
    }
  }, [score, noq]);

  // fetch an image from API
  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXEL_API_KEY,
    }
  );

  // extract the image
  const image = result ? result.photos[0]?.src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Your Badge is Loading...</div>}
      {error && <div className={classes.badge}>There is an Error</div>}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Badge" />
        </div>
      )}
    </div>
  );
}
