import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import Info from "./Info";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Password didn't match");
    }

    try {
      setError("");
      setLoading(true);

      await signup(email, password, username);
      history.push("/");
      
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an Account!");
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        required
        type="text"
        placeholder="Enter Email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        required
        type="password"
        placeholder="Enter Password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        required
        type="password"
        placeholder="Confirm Password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        required
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <Info />
    </Form>
  );
}
