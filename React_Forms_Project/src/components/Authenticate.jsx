import { useState } from "react";
import axios from "axios";
import './Authenticate.css';

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null); // State for user data

  async function handleClick() {
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

      const result = response.data;
      console.log(result);
      setSuccessMessage(result.message);
      setUserData(result.data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate!</h2>
      {error && <p className="authenticate-error">{error}</p>}
      {successMessage && <p className="authenticate-message">{successMessage}</p>}
      {userData && <p className="authenticate-username">Username: {userData.username}</p>}
      <button className="authenticate-button" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}