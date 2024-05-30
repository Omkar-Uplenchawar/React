import React, { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logout } from "../components/Logout"; 

export const Dashboard = () => {
  const [textBox, setTextBox] = useState("omkar");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("#");
        setRole("editor");
        setTextBox(response.data.text);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const handleSubmit = async () => {
      if (role === "editor") {
        try {
          const response = await axios.put("#", {
            text: textBox,
          });
          console.log("Submission successful:", response.data);
          navigate("/dashboard");
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      } else {
        console.log("User does not have permission to submit.");
      }
    };

    handleSubmit();
  }, [textBox]);

  return (
    <div>
      <div className="m-8">
          <Logout /> 
        {role === "Reader" && (
          <div>
            <InputBox
              value={textBox}
              //onChange={(e) => setTextBox(e.target.value)}
              placeholder="Text"
              label="This text is readable only"
              readOnly={role !== "editor"}
            />
          </div>
        )}

        {role === "editor" && (
          <div>
            <InputBox
              value={textBox}
              onChange={(e) => setTextBox(e.target.value)}
              placeholder="Text"
              label="Edit below what you want"
            />
          </div>
        )}
      </div>
    </div>
  );
};
