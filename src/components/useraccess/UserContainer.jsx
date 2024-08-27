import React from "react";
import User from "./User";

const UserContainer = ({ users, sendEmail }) => {
  return (
    <tbody>
      {users.map((user) => {
        return <User key={user.id} user={user} sendEmail={sendEmail} />;
      })}
    </tbody>
  );
};

export default UserContainer;
