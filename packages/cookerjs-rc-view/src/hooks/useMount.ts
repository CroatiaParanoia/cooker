import { useEffect, useRef } from "react";

const useMount = (fn: Function) => {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  useEffect(() => {
    return ref.current();
  }, []);
};

export default useMount;
