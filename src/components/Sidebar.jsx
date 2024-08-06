import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  BsFillHouseDoorFill,
  BsFillPersonPlusFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { HiOutlineTemplate } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import logo from "../assets/logo.png";
import "../assets/sidebar.css";

function Sidebar() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const toggleOnboarding = () => {
    setOnboardingOpen(!onboardingOpen);
  };

  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={logo} alt="KeelHub Logo" className="logo" />
          <span>KeelHub</span>
        </div>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsFillHouseDoorFill className="icon" /> Home
          </Link>
        </li>
        <li className="sidebar-list-item">
          <button className="sidebar-button" onClick={toggleOnboarding}>
            <BsFillPersonPlusFill className="icon" /> Onboarding
          </button>
          {onboardingOpen && (
            <ul className="sidebar-sublist">
              <li className="sidebar-list-item">
                <Link to="/onboarding">
                  <HiOutlineTemplate className="icon" /> Tasks
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/onboarding-task-setting">
                  <FiEdit2 className="icon" /> Workflow
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <Link to="/project">
            <BsFillPeopleFill className="icon" /> Project
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/volunteers">
            <BsFillPeopleFill className="icon" /> Volunteers
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
