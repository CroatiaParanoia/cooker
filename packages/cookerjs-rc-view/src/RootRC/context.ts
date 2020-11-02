import React from "react";

const ctx = React.createContext({
  components: {} as Record<string, React.FC<any>>,
});

export default ctx;
