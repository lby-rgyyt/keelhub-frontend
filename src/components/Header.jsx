import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { TbGridDots } from "react-icons/tb";
import { FiBell } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import defaultUser from "../assets/defaultUser.jpg";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, currentUser, logout } = useContext(UserContext);
  const [notificationCount, setNotificationCount] = useState(4);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    // console.log(currentUser);
  }, [currentUser]);

  const pageName = location.pathname.split('/').filter((x) => x).map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' '); 

  

  // const getBreadcrumbs = () => {
  //   const pathnames = location.pathname.split('/').filter((x) => x);
  //   return pathnames.map((name, index) => {
  //     const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
  //     const isLast = index === pathnames.length - 1;
  //     return (
  //       <li key={name}>
  //         {isLast ? (
  //           <span className="text-gray-500">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
  //         ) : (
  //           <>
  //             <a href={routeTo} className="text-blue-600 hover:text-blue-800">
  //               {name.charAt(0).toUpperCase() + name.slice(1)}
  //             </a>
  //             <span className="mx-2">/</span>
  //           </>
  //         )}
  //       </li>
  //     );
  //   });
  // };

  return (
    <header className="flex justify-between min-w-full bg-white " style={{
      borderBottomWidth: "1px"
    }}>
      <div className="flex items-center justify-center p-4 ">
        Volunteers
      </div>
      <div className="flex gap-4  p-4 items-center">
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <FiBell className="h-6 w-6" />
          </button>
          {notificationCount > 0 && (
            <div className="absolute flex ml-3 bg-red-600 rounded-full h-3 w-3 items-center justify-center text-white " style={{
              fontSize: "8px",
              lineHeight: "1rem"
            }}>
              {notificationCount}
            </div>
          )}
          <button className="text-gray-500 hover:text-gray-700">
            <TbGridDots className="h-6 w-6" />
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-sm focus:outline-none"
          >
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={currentUser.profile_pic || defaultUser}
              alt={currentUser.first_name}
            />
            <HiChevronDown className="h-4 w-4" />
          </button>
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute right-0 mt-10 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button
                onClick={handleProfile}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header >
  );
}

export default Header;
