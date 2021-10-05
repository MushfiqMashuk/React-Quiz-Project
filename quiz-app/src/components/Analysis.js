import classes from "../styles/Analysis.module.css";
import Question from "./Question";

export default function Analysis({ score, noq, answers}) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <h4>You answerd {score / 5} out of {noq} questions correctly</h4>

      <Question questions={answers}/>
    </div>
  );
}
