import Checkbox from "../components/Checkbox";
import classes from "../styles/Answers.module.css";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.length > 0 &&
        options.map((option, index) =>
          input ? (
            <Checkbox
              key={index}
              className={classes.answer}
              text={option.title}
              onChange={(e) => handleChange(e, index)}
              value={index}
              checked={option.checked}
            />
          ) : (
            <Checkbox
              key={index}
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
            />
          )
        )}
    </div>
  );
}
