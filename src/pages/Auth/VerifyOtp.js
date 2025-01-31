import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { VerifyOTPApi } from "../../store/slices/AuthSlice";

function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { email } = location?.state || {};

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];

    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index] !== "") {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        e.target.previousSibling.focus();
      }

      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    dispatch(VerifyOTPApi({ email: email, otp: Number(enteredOtp) })).then(
      () => {
        navigate("/login");
        setError("");
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">Verify OTP</h1>

      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <button
        onClick={handleVerify}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
      >
        Verify OTP
      </button>
      <p className="text-gray-600 text-center mt-4">
        <a href="#" className="text-primary ml-2 cursor-pointer">
          Resend OTP
        </a>
        <span className="mx-2">|</span>
        <a
          onClick={() => navigate("/login")}
          className="text-primary cursor-pointer"
        >
          Login
        </a>
      </p>
    </div>
  );
}

export default VerifyOtp;
