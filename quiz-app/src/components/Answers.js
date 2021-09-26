import Checkbox from "../components/Checkbox";
import classes from "../styles/Answers.module.css";

export default function Answers() {
  return (
    <div className={classes.answers}>
      <Checkbox className={classes.answer} text="The Last JEDI" />
      <Checkbox className={classes.answer} text="A New Hope" />
      <Checkbox className={classes.answer} text="Mandalorian" />
    </div>
  );
}
