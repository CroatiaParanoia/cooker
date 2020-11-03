import React, { useCallback, useEffect, useMemo } from "react";
import Cooker, { Node, Template, isContainer } from "cookerjs";
import Component from "./Component";
import Container from "./Container";
import ctx from "./context";
import useEventCallback from "./hooks/useEventCallback";

interface RootProps {
  value: Record<string, any>;
  onChange?: (newValue: RootProps["value"]) => void;
  template: Template;
  dataSource?: Record<string, any>;
  components?: Record<string, React.FC<any>>;
}

const noopFn = () => {};

const Root: React.FC<RootProps> = ({
  value,
  template,
  components = {},
  onChange = noopFn,
}) => {
  const handleChange = useEventCallback(onChange, []);

  const cooker = useMemo(() => {
    const v = new Cooker(template, {}, {});

    v.subscribe((value) => {
      handleChange(value);
    });

    return v;
  }, [template, handleChange]);

  useEffect(() => {
    cooker.value$.setValue(value);
  }, [value, cooker]);

  const renderNodes = useCallback((nodes: Node[]) => {
    return nodes.map((item) => {
      const curTemplate = item.curTemplate;
      if (!curTemplate) return null;
      const key = item.path.join("-");
      if (isContainer(curTemplate)) {
        return (
          <Container key={key} root={item}>
            {renderNodes(item.children!)}
          </Container>
        );
      }

      return <Component key={key} root={item} />;
    });
  }, []);

  return (
    <ctx.Provider value={{ components }}>
      {renderNodes(cooker.children)}
    </ctx.Provider>
  );
};

export default Root;
