import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      console.log("Authorization code:", code);

      if (!code) {
        console.error("No authorization code found");
        navigate("/login");
        return;
      }

      try {
        const payload = { code: code };

        const response = await axios.post(
          "http://localhost:4000/auth/callback",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Server response:", response.data);

        if (response.data.token) {
          localStorage.setItem("github_token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("avatar", response.data.avatar);
          localStorage.setItem("name", response.data.name);
          navigate("/");
        } else {
          throw new Error("No token received");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    getToken();
  }, [navigate]);

  return (
  <div className='main-bg flex justify-center items-center min-h-screen'>
    Loading...
  </div>
  ) 
};

export default AuthCallback;
