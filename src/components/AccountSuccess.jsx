import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import keelworksLogo from "../assets/keelworks_cover.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { MaterialSymbol } from "react-material-symbols";

const AccountSuccess = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, login,currentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

    useEffect(()=>{
        if(!currentUser){
            navigate('/')
        }
    })


  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

      navigate("/dashboard",{ replace: true });
  }
    

  return (
      <div className="flex mx-auto">
        <div className="relative w-2/5 h-screen z-50">
          <img className="absolute w-full h-full" src="src\assets\image.png" />
        </div>
        <div className="bg-gray-100 w-3/5 h-screen flex flex-col items-center justify-center">
          <div className="w-[530px] h-[300px] pr-15 mt-auto pl-10 mb-[130px] justify-center">
            <h1 className="text-black pt-4 text-4xl">Your account was set up!</h1>
            <h3 className="pl-10 pt-3 text-gray-600">Let's get started by exploring the dashboard</h3>
            <div className="pl-5 pt-10 border-black">
            <button type="submit" onClick={handleSubmit} className="flex space-x-2 w-[130px] h-[40px] bg-blue-700 justify-center rounded-md 
                px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600 ml-[110px]">  
                <p className="mt-2">Continue</p>
                <div className="mr-[2px] mt-2 ">
                    <MaterialSymbol icon="arrow_forward" size={24}/> 
                    {/* Go back to home */}
                </div>
            </button>
           </div>
          </div>
        </div>
      </div>

  )
};

export default AccountSuccess;
