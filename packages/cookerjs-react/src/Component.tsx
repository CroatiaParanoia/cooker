import React, { useCallback } from "react";
import { Node } from "cookerjs";
import ctx from "./context";
import useForceUpdate from "./hooks/useForceUpd";
import useMount from "./hooks/useMount";

const Component: React.FC<{ root: Node }> = ({ root }) => {
  const { components } = React.useContext(ctx);

  const currentComponent = (components as any)[root.curTemplate?.name ?? ""];

  const forceUpdate = useForceUpdate();

  const handleOutputChange = useCallback(
    (output) => {
      root.setOutput(output);
      forceUpdate();
    },
    [root, forceUpdate]
  );

  useMount(() => {
    const watchKeys = root.dynamicFieldArr?.map((v) => v.dynamicKey) ?? [];

    const o = root.subscribeValue(() => {
      forceUpdate();
    }, watchKeys);

    return () => {
      o.unsubscribe();
    };
  });

  const input = root.input$.getValue();
  return React.createElement(currentComponent, {
    setOutput: handleOutputChange,
    input,
  });
};

export default Component;
