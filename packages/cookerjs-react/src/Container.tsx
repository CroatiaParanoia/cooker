import React from "react";
import { Node } from "cookerjs";
import ctx from "./context";

const Component: React.FC<{ root: Node }> = ({ children, root }) => {
  const { components } = React.useContext(ctx);

  const currentComponent = (components as any)[root.curTemplate?.name ?? ""];

  // const input = root.input$.getValue();

  return React.createElement(currentComponent, { children });
};

export default Component;
