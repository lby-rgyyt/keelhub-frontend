import React from "react";
import Project from "./Project";

const ProjectContainer = ({ projects }) => {
  return (
    <tbody>
      {projects.map((project) => {
        return <Project key={project.id} project={project} />;
      })}
    </tbody>
  );
};

export default ProjectContainer;
