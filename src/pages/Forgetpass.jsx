import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("#", {
        email,
      });
      setResponseMessage(response.message);
    } catch (error) {
      console.error("Error occurred:", error);
      setResponseMessage("Please try again later.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Forget Password"} />
          <SubHeading label={"Enter your Email to access your account"} />
          <InputBox
            placeholder="Omkar@gmail.com"
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Submit"} onClick={handleSubmit} />
          </div>
          {responseMessage && (
            <BottomWarning
              label={responseMessage}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
