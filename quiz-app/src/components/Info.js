import { Link } from "react-router-dom";

export default function Info() {
  return (
    <div className="info">
      Already have an account? <Link to="/login">Login</Link> instead.
    </div>
  );
}
