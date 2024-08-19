import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiUserAdd,
  HiClipboardList,
  HiTemplate,
  HiViewGrid,
  HiUserGroup,
  HiUser,
} from "react-icons/hi";
import { TbUserBolt } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import keelWorksLogoBlack from "../assets/logo.png";

function Sidebar() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [userAccessOpen, setUserAccessOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 min-h-screen p-4 border-r border-gray-200">
      <h1 className="flex items-center text-2xl font-semibold text-gray-800 mb-8">
        <img
          src={keelWorksLogoBlack}
          alt="KeelWorks Logo"
          className="h-8 w-auto mr-2"
        />
        KeelWorks
      </h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-link ${
                isActive("/dashboard") ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <HiHome className="sidebar-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setOnboardingOpen(!onboardingOpen)}
              className={`sidebar-link w-full justify-between ${
                onboardingOpen ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <div className="flex items-center">
                <HiUserAdd className="sidebar-icon" />
                <span>Onboarding</span>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  onboardingOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {onboardingOpen && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/onboarding/tasks"
                    className={`sidebar-link ${
                      isActive("/onboarding/tasks")
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <HiClipboardList className="sidebar-icon" />
                    <span>Tasks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/onboarding/workflow"
                    className={`sidebar-link ${
                      isActive("/onboarding/workflow")
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <HiTemplate className="sidebar-icon" />
                    <span>Workflow</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/project"
              className={`sidebar-link ${
                isActive("/project") ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <HiViewGrid className="sidebar-icon" />
              <span>Project</span>
            </Link>
          </li>
          <li>
            <Link
              to="/volunteers"
              className={`sidebar-link ${
                isActive("/volunteers") ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <HiUserGroup className="sidebar-icon" />
              <span>Volunteers</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => setUserAccessOpen(!userAccessOpen)}
              className={`sidebar-link w-full justify-between ${
                userAccessOpen ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <div className="flex items-center">
                <TbUserBolt className="sidebar-icon" />
                <span>User Access</span>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  userAccessOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {userAccessOpen && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/user-access/roles"
                    className={`sidebar-link ${
                      isActive("/user-access/roles")
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <HiUser className="sidebar-icon" />
                    <span>Roles</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user-access/access"
                    className={`sidebar-link ${
                      isActive("/user-access/access")
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <MdLockOutline className="sidebar-icon" />
                    <span>Access</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
