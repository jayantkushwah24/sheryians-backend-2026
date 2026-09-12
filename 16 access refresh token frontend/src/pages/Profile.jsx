import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import useApi from "../shared/api";

const Profile = () => {
  const { setUser, user } = useAuth();
  const api = useApi();

  async function fetchUser() {
    const response = await api.get("/auth/me");
    setUser(response.data.data.user);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
