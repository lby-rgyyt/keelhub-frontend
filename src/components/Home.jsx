import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import keelworksLogo from "../assets/keelworks_cover.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, login, currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError(null);

    try{
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post("http://localhost:3001/api/auth/google-login", credentialResponseDecoded);

      const {token, user } = response.data;

      console.log(response.data)

      await login(user, token);

      // navigate("/dashboard");
      // console.log("user.secret_2fa", user.secret_2fa)
      navigate(user && user.secret_2fa ? "/2fa" : '2fa-setup', {replace:true})

      // if(currentUser && currentUser.secret_2fa!==null){
      //   navigate('/2fa')
      // }
      // else if(currentUser && currentUser.secret_2fa==null){
      //   navigate('/2fa-setup')
      // }

    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
      <div className="flex mx-auto">
        <div className="relative w-2/5 h-screen z-50">
          <img className="absolute w-full h-full" src="src\assets\image.png" />
          <div className="absolute inset-0 flex justify-center bg-opacity-75 p-8 h-1/2">
            <div className=" p-20 text-white mt-40">
              <p className="">Never doubt that a small group of thoughtful, committed citizens can change the world; 
                indeed, it's the only thing that ever has.
              </p>
              <p className="pt-5">- Margaret Mead</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-3/5 h-screen flex flex-col items-start justify-start">
          <div className="w-[530px] h-[300px] pr-15 mt-auto pl-10 mb-[130px]">
            <h1 className="text-black pl-4 pt-4 text-6xl">Hello!</h1>
            <h3 className="pl-5 pt-3 text-gray-600">Use the Google button to login</h3>
            <div className="pl-5 pt-10 border-black">
             <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                 setError("Google Login Failed");
               }}
             />
            <button onClick={()=>{navigate("/login");}} className="flex w-[200px] ml-[10px] mt-10 justify-center py-auto rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>

           </div>
          </div>
            <footer className="bg-gray-100 w-full flex flex-col items-center pb-4">
              <div className="flex space-x-2 text-xs">
                <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </div>
              <p className="text-gray-600 text-xs">This site is protected by reCAPTCHA Enterprise. 
              <a href="#" className="text-blue-500 hover:underline"> Privacy Policy </a> and 
              <a href="#" className="text-blue-500 hover:underline"> Terms of Use </a> 
                apply
              </p>
            </footer>
        </div>
      </div>

  )
};

export default Home;
