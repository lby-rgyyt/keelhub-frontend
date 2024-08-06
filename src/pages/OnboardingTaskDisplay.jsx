import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OnboardingTasks from '../components/OnboardingTask'; 

const OnboardingTaskDisplay = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4" style={{ marginLeft: '250px' }}> {/* Add a left margin to accommodate the fixed sidebar */}
          <h2 className="text-3xl font-bold mb-4">Onboarding Task Display</h2>
          <OnboardingTasks />
        </main>
      </div>
    </div>
  );
};

export default OnboardingTaskDisplay;
