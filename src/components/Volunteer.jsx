import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Volunteer = (props) => {
  const { volunteer } = props;
  //   console.log(volunteer.Volunteer.jobTitles[0].title);
  console.log(volunteer);
  const date = new Date(volunteer.created_at);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return (
    <tr>
      {/* <td>Volunteer {volunteer.id}</td> */}
      <td>
        <Link to={`/volunteer-detail`} state={{ volunteer, formattedDate }}>
          {volunteer.first_name} {volunteer.last_name}
        </Link>
      </td>
      <td>{volunteer.Volunteer.jobTitles[0]?.title}</td>
      <td>{formattedDate}</td>
      <td>{volunteer.Volunteer.time_committed_per_week}</td>
      {/* <td>{volunteer.Volunteer.status}</td> */}
      <td>
        <span
          className={`status status-${volunteer.Volunteer.status.toLowerCase()}`}
        >
          {volunteer.Volunteer.status}
        </span>
      </td>
      <td></td>
      {/* <p>------</p> */}
      <td>
        <button className="actions-button">⋯</button>
      </td>
    </tr>
  );
};

export default Volunteer;
