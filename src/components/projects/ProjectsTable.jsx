import React from "react";
import ProjectContainer from "./ProjectContainer";

const ProjectsTable = ({
  projects,
  sortByName,
  sortByPm,
  sortByStartDate,
  sortByDueDate,
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-200">
          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByName}
              className="flex items-center hover:text-gray-900"
            >
              Name <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByPm}
              className="flex items-center hover:text-gray-900"
            >
              Creator <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByStartDate}
              className="flex items-center hover:text-gray-900"
            >
              Start Date <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByDueDate}
              className="flex items-center hover:text-gray-900"
            >
              Due Date <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">Status</th>
          <th className="p-3 text-left font-semibold text-gray-600">Members</th>

          <th className="p-3 text-left font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <ProjectContainer projects={projects} />
    </table>
  );
};

export default ProjectsTable;
