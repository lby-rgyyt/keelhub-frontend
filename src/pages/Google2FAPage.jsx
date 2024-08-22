import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Google2FAPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secretCode, set2secretCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      console.log("generate qr code secret22:", secretCode);
      const response = await axios.post(
        "http://localhost:3001/api/auth/verify2fa",
        {
          secret: secretCode,
          token: token,
        }
      );
      setMessage(response.data);
      setMessage(response.data);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    generateQrCode();
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/generate2fa`
      );
      console.log("generate qr code response:", response);
      const { qrCode, secret } = response.data;
      set2secretCode(secret);
      setQrCode(qrCode);
      console.log("generate qr code secret value:", secretCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Two-factor Authentication
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="mt-3 text-xl text-gray-600 sm:mt-5">
            Two-factor authentication (2FA) using Google Authenticator provides
            enhanced security for your account by generating a code each time
            you log in. Follow the steps below to get started:
          </p>
          <p className="mt-3 text-xl text-gray-600 font-extrabold sm:mt-5">
            1. Download Google Authenticator:
          </p>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5">
            Download the app onto your mobile device
          </p>
          <a
            className="mt-3 text-sm text-blue-600 sm:mt-5"
            href="https://apps.apple.com/us/app/google-authenticator/id388497605"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for iOS
          </a>
          &nbsp;&nbsp;&nbsp;
          <a
            className="mt-3 text-sm text-blue-600 sm:mt-5"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Android
          </a>
          <p className="mt-3 text-xl text-gray-600 font-extrabold sm:mt-5">
            2. Scan the QR Code:
          </p>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5">
            Open the Google Authenicator and scan the QR code
          </p>
          <img
            style={{ width: "200px", height: "200px" }}
            className="h-20 w-20 rounded-full object-cover"
            src={qrCode}
          ></img>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5">
            Or enter this code if you can't scan the QR code
          </p>
          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your code here
              </label>
              <div className="mt-1">
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleVerify}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
              {message && <p>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Google2FAPage;
