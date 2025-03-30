import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/config.services";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await service.post(`/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });

      navigate(`/login`);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        console.log(error.response.status);
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
      }
    }
  };

  return (
    <div className="pageDiv">
      <h1>SIGN UP</h1>

      <form onSubmit={handleSignup}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Sign Up</button>

        {errorMessage !== null ? <p>{errorMessage}</p> : null}
      </form>

      <h3>You aready have an account?</h3>
      <Link to={"/login"}><button>Log In</button></Link>
    </div>
  );
}

export default Signup;
