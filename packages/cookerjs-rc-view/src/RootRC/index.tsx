import React, { useCallback, useEffect, useMemo } from "react";
import Cooker, { Node } from "cookerjs";
import { Template, isContainer } from "cookerjs";
import Component from "./Component";
import Container from "./Container";
import ctx from "./context";

interface RootProps {
  value: Record<string, any>;
  onChange?: (newValue: RootProps["value"]) => void;
  template: Template;
  components: Record<string, React.FC>;
}

const Input: React.FC<any> = ({ setOutput, input: { placeholder, value = '' } }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setOutput(e.target.value)}
    />
  );
};
const Text: React.FC<any> = ({ input: { content } }) => {
  console.log(content, "content");
  return <span>{content}</span>;
};

const RootRC: React.FC<RootProps> = ({
  value,
  template,
  components = { Input, Text },
  onChange,
}) => {
  const cooker = useMemo(() => {
    const v = new Cooker(template, {}, value);

    v.subscribe((value) => {
      onChange?.(value);
    });
    return v;
  }, [template, value, onChange]);

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
    <ctx.Provider value={{ components: { Input, Text } }}>
      {renderNodes(cooker.children)}
    </ctx.Provider>
  );
};

export default RootRC;
