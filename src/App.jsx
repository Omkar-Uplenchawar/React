import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Forgetpass } from "./pages/Forgetpass";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const handleToken = async () => {
      let existingToken = Cookies.get("token");
      if (!existingToken) {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          console.error("Refresh token not found.");
          return;
        }

        try {
          const response = await axios.post("#", { refreshToken });
          existingToken = response.data.token;
          Cookies.set("token", existingToken, { expires: 3 });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 30,
          }); 
          setToken(existingToken);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error("Refresh token expired or invalid.");
          } else {
            console.error("Error handling token:", error);
          }
        }
      } else {
        setToken(existingToken);
      }
    };

    handleToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {token && <Route path="/" element={<Dashboard />} />}
        <Route path="/" element={<Navigate replace to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/forgetpass" element={<Forgetpass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
