import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { HiUsers, HiClipboardList, HiCalendar, HiChartBar } from "react-icons/hi";
import defaultProfile from "../assets/defaultProfile.png";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const stats = [
    { name: 'Total Volunteers', stat: '71', icon: HiUsers },
    { name: 'Active Tasks', stat: '12', icon: HiClipboardList },
    { name: 'Upcoming Events', stat: '3', icon: HiCalendar },
    { name: 'Project Completion', stat: '58%', icon: HiChartBar },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          
          <div className="mt-4">
            <div className="rounded-lg bg-white overflow-hidden shadow">
              <h2 className="sr-only" id="profile-overview-title">Profile Overview</h2>
              <div className="bg-white p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                    <div className="flex-shrink-0">
                      <img className="mx-auto h-20 w-20 rounded-full" src={currentUser.profilePic || defaultProfile} alt="" />
                    </div>
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                      <p className="text-xl font-bold text-gray-900 sm:text-2xl">{currentUser.firstName} {currentUser.lastName}</p>
                      <p className="text-sm font-medium text-gray-600">{currentUser.role}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0">
                    <a
                      href="#"
                      className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add more dashboard widgets here */}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;