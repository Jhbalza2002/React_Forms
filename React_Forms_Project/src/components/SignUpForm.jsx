import { useState } from "react";
import axios from "axios";
import './SignUpForm.css';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUsernameError(null);
    setPasswordError(null);

    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!username || username.length < 8) {
      setUsernameError("Username must be at least 8 characters long.");
      return;
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username,
          password,
        }
      );

      const result = response.data;
      setToken(result.token);

      console.log(response.data);
      setUsername("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up Form</h2>
      {error && <p className="error-message">{error}</p>}
      {usernameError && <p className="error-message">{usernameError}</p>}
      {passwordError && <p className="error-message">{passwordError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
