import classes from "../styles/Illustration.module.css";

export default function Illustration({ alt, ...rest }) {
  return (
    <div className={classes.illustration}>
      <img {...rest} alt={alt} />
    </div>
  );
}
