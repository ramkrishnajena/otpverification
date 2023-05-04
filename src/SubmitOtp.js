import React, { useState, useRef, useEffect } from "react";

export default function OtpPopup({ number, status }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value) || value === " ") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    number(newOtp);
    if (value !== "") {
      if (index === otp.length - 1) {
        inputsRef.current[index].blur();
      } else {
        inputsRef.current[index + 1].focus();
      }
    } else {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.keyCode === 8 && otp[index] === "") {
      inputsRef.current[index - 1].focus();
    } else if (event.keyCode === 37 && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (event.keyCode === 39 && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData
      .getData("text")
      .trim()
      .substr(0, otp.length);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (isNaN(pastedData[i]) || pastedData[i] === " ") continue;
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    console.log(otp);
  };

  return (
    <div className='phone-verification-popup'>
      <h2>Phone Verification</h2>
      <p>Please enter the 6-digit OTP sent to your phone number.</p>
      <div className='otp-input-container'>
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            maxLength='1'
            pattern='[0-9]*'
            inputMode='numeric'
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className='resend-otp'>
        <p>Change Number</p>
        <p>Re-send OTP</p>
      </div>
      <button onClick={() => status()}>Verify Your Phone Number</button>
    </div>
  );
}
