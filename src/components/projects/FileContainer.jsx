import React from "react";
import File from "./File";

const FileContainer = ({ files }) => {
  return (
    <tbody>
      {files.map((file) => {
        return <File key={file.id} file={file} />;
      })}
    </tbody>
  );
};

export default FileContainer;
