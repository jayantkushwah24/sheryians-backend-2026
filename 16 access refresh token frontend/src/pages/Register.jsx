import React, { useState } from "react";
import useApi from "../shared/api";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const api = useApi();
  const { setAccessToken, setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    setAccessToken(response.data.accessToken);
    setUser(response.data.data.user);

    navigate("/profile");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
