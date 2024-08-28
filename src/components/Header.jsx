import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineBell, HiChevronDown } from "react-icons/hi";
import { UserContext } from "../context/UserContext";
import defaultUser from "../assets/defaultUser.jpg";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, currentUser, logout } = useContext(UserContext);
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
    <header className=" shadow-sm fixed w-full z-10" style={{ left: "280px" }}>
      {/* Adjusted left position */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
      {pageName}

          <nav className="flex" aria-label="Breadcrumb">
            {/* <ol className="flex items-center space-x-4"> */}
            {/* <li>
                <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
              </li>
              {getBreadcrumbs()}
            </ol> */}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <HiOutlineBell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={currentUser.profile_pic || defaultUser}
                  alt={currentUser.first_name}
                />
                <span>
                  {currentUser.first_name} {currentUser.last_name}
                </span>
                <HiChevronDown className="h-4 w-4" />
              </button>
              {isLoggedIn && isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        </div>
      </div>
    </header>
  );
}

export default Header;
