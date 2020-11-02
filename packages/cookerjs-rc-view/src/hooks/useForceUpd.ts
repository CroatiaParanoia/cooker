import React from "react";

export default function useForceUpdate() {
  const [, forceUpd] = React.useState(0);

  const forceUpdate = React.useCallback(() => {
    forceUpd(Date.now());
  }, []);

  return forceUpdate;
}
