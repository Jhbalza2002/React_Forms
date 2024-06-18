import { useState } from "react";
import axios from "axios";
import './Authenticate.css';

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    if (!token) {
      setError("Please submit the form before trying to authenticate the token.");
      return;
    }

    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.data;
      console.log(result);
      setSuccessMessage(result.message);
      setUsername(result.data.username);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate!</h2>
      {error && <p className="authenticate-error">{error}</p>}
      {successMessage && <p className="authenticate-message">{successMessage}</p>}
      {username && <p className="authenticate-username">Username: {username}</p>}
      <button className="authenticate-button" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}
