import { useState } from "react";
import "./styles.css";
import SubmitOtp from "./SubmitOtp";

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [number, setNumber] = useState("");
  const btnClicked = () => {
    setClicked(!clicked);
  };
  return (
    <div className='App'>
      <p>OTP IS:{number}</p>
      <button onClick={btnClicked}>Generate OTP</button>
      {clicked && <SubmitOtp number={setNumber} status={btnClicked} />}
    </div>
  );
}
