import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Reader");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("#", {
        email,
        firstName,
        lastName,
        password,
        role,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Signup error:", error);
      setResponseMessage("Signup failed. Please try again later.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Omkar@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
          />
          <InputBox
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="123456"
            label={"Confirm Password"}
            type="password"
          />
          <div className="pt-2">
            <label
              className="block text-sm font-medium mb-2 text-left"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Reader">Reader</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign up"} />
          </div>
          {responseMessage ? (
            <BottomWarning label={responseMessage} to={"/signin"} />
          ) : (
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
