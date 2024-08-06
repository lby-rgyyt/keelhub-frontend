import React from "react";
import VolunteerContainer from "./VolunteerContainer";

const VolunteersTable = ({ volunteers, sortByName, sortByHrs, sortByRole }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button onClick={sortByName}>Name</button>
          </th>
          <th>
            <button onClick={sortByRole}>Role</button>
          </th>
          <th>
            <button onClick={sortByHrs}>Start Date</button>
          </th>
          <th>
            <button onClick={sortByHrs}>Hours/wk</button>
          </th>
          <th>Status</th>
          <th>Projects Assigned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <VolunteerContainer volunteers={volunteers} />
    </table>
  );
};

export default VolunteersTable;
