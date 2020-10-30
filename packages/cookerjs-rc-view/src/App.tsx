import React, { useEffect } from "react";
import "./App.css";
import cookerjs from "cookerjs";
import RootRC from "./RootRC";

const value = {
  textValue: "这是默认的值",
};

const template = {
  version: "1",
  content: [
    {
      name: "Row",
      children: [
        {
          name: "Col",
          children: [
            {
              name: "Input",
              input: {
                value: { $input: "textValue" },
                placeholder: "请输入",
              },
            },
          ],
        },
        {
          name: "Col",
          children: [
            {
              name: "Text",
              input: {
                content: "这是一段话",
              },
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  return (
    <div>
      <RootRC value={value} template={template} components={{}} />
    </div>
  );
}

export default App;
