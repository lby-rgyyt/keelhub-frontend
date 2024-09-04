import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectOverview from "./ProjectOverview";
import ProjectMembers from "./ProjectMembers";
import ProjectResources from "./ProjectResources";
import axios from "axios";

const ProjectDetail = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { projectId } = location.state || {};

  const [project, setProject] = useState("");
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  console.log("projectId: ", projectId);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("project: ", response.data);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchProject();
  }, []);

  const renderTabs = () => {
    const tabs = [
      { id: "overview", label: "Overview" },
      { id: "members", label: "Members" },
      { id: "resources", label: "Resources" },
    ];

    return (
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProjectOverview projectId={projectId} />;
      case "members":
        return <ProjectMembers projectId={projectId} />;
      case "resources":
        return <ProjectResources projectId={projectId} />;
      default:
        return <ProjectOverview />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-600 mb-6">
        View and Edit all your project details at a glance!
      </p>
      {renderTabs()}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default ProjectDetail;
