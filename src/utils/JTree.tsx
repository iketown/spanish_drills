import React from "react";
import { JSONTree } from "react-json-tree";

interface JTreeI {
  data: any;
  title?: string;
  showRoot?: boolean;
}

const JTree: React.FC<JTreeI> = ({ data, title, showRoot }) => {
  if (process.env.NODE_ENV === "development") return null;
  return <JSONTree data={data} hideRoot={!showRoot} />;
};

export default JTree;
