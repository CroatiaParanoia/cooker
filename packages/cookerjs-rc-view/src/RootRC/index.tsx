import React, { useEffect } from "react";
import Cooker from "cookerjs";
import { Template, isContainer } from "cookerjs";

interface RootProps {
  value: Record<string, any>;
  onChange?: (newValue: RootProps["value"]) => void;
  template: Template;
  components: Record<string, React.FC>;
}

const RootRC: React.FC<RootProps> = ({ value, template, components = {} }) => {
  useEffect(() => {
    const v = new Cooker(template, {}, value);

    v.subscribe((value) => {
      console.log(value, "value changed");
    });
    console.log(v, "vvvv");
    // @ts-ignore
    window.cooker = v;
    return () => {};
  }, [template, value]);

  return <div>123</div>;
};

export default RootRC;
