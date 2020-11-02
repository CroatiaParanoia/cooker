import React, { useCallback } from "react";
import { Node } from "cookerjs";
import ctx from "./context";

const Component: React.FC<{ root: Node }> = ({ children, root }) => {
  const { components } = React.useContext(ctx);

  const currentComponent = (components as any)[root.curTemplate?.name ?? ""];
  const setOutput = useCallback(
    (output) => {
      root.setOutput(output);
    },
    [root]
  );

  const input = root.input$.getValue();

  return React.createElement(currentComponent, { setOutput, input });
};

export default Component;
