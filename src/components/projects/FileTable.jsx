import React from "react";
import FileContainer from "./FileContainer";

const FileTable = ({
  files,
  sortByName,
  sortByCreateDate,
  sortByUpdateDate,
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
              File Name <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            Posted By
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByCreateDate}
              className="flex items-center hover:text-gray-900"
            >
              Date Posted <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByUpdateDate}
              className="flex items-center hover:text-gray-900"
            >
              Last Edited <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <FileContainer files={files} />
    </table>
  );
};

export default FileTable;
