import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import CreateAccount from "./components/CreateAccount";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Dashboard from "./pages/Dashboard";
import OnboardingTaskDisplay from "./pages/OnboardingTaskDisplay";
import VolunteerListPage from "./pages/VolunteerListPage";
import { UserContext } from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Volunteers from "./pages/Volunteers";
import VolunteerDetail from "./components/volunteers/VolunteerDetail";
import UserAccessRoles from "./pages/UserAccessRoles";
import UserAccessList from "./components/useraccess/UserAccessList";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Public route that renders the Layout without sign-in */}
        <Route
          path="/public/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Other routes that require sign-in */}
        <Route
          path="/create-account"
          element={
            isLoggedIn ? (
              <Layout>
                <CreateAccount />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/onboarding/workflow"
          element={
            isLoggedIn ? (
              <Layout>
                <OnboardingTaskDisplay />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/onboarding/tasks"
          element={
            isLoggedIn ? (
              <Layout>
                <VolunteerListPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/volunteers"
          element={
            isLoggedIn ? (
              <Layout>
                <Volunteers />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/volunteer-detail/"
          element={
            isLoggedIn ? (
              <Layout>
                <VolunteerDetail />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-access/roles"
          element={
            isLoggedIn ? (
              <Layout>
                <UserAccessRoles />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-access/list"
          element={
            isLoggedIn ? (
              <Layout>
                <UserAccessList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
