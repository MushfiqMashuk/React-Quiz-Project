import signupImage from "../../assets/images/signup.svg";
import Illustration from "../Illustration";
import SignupForm from "../SignupForm";

export default function Signup() {
  return (
    <>
      <h1>Create an Account</h1>
      <div className="column">
        <Illustration alt="Signup" src={signupImage} />

        <SignupForm />
      </div>
    </>
  );
}
