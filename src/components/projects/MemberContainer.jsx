import React from "react";
import Member from "./Member";

const MemberContainer = ({ members }) => {
  return (
    <tbody>
      {members.map((member) => {
        return <Member key={member.id} member={member} />;
      })}
    </tbody>
  );
};

export default MemberContainer;
