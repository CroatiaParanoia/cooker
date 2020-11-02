import React, { useEffect } from "react";

const noop: any[] = [];

const useEventCallback = (fn: (...args: any[]) => any, deps: any[] = noop) => {
  const ref = React.useRef((...args: any) => new Error("pending"));

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);

  return React.useCallback(
    (...args) => {
      const f = ref.current;

      return f(...args);
    },
    [ref]
  );
};

export default useEventCallback;
