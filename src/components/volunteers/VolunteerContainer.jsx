import React from "react";
import Volunteer from "./Volunteer";

const VolunteerContainer = ({ volunteers }) => {
  return (
    <tbody>
      {volunteers.map((volunteer) => {
        return <Volunteer key={volunteer.id} volunteer={volunteer} />;
      })}
    </tbody>
  );
};

export default VolunteerContainer;
