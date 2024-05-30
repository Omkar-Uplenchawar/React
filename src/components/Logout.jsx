import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"; 
import { Button } from "./Button";

export const Logout = () => {
  const [token, setToken] = useState(null); 
  const [refreshToken, setRefreshToken] = useState(null); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("#", {
        token,
        refreshToken,
      });
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="absolute top-0 right-0 mt-4 ml-4 mx-8">
      <Button onClick={handleLogout} label={"Logout"} />
    </div>
  );
};
