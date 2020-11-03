import React from "react";
import "./App.css";
import CookerRoot from "cookerjs-react";

// const template = {
//   version: "1",
//   content: [
//     {
//       name: "Row",
//       children: [
//         {
//           name: "Col",
//           children: [
//             {
//               name: "Input",
//               input: {
//                 value: { $input: "textValue" },
//                 placeholder: "请输入",
//               },
//             },
//           ],
//         },
//         {
//           name: "Col",
//           children: [
//             {
//               name: "Text",
//               input: {
//                 content: "这是一段话",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const Input: React.FC<any> = ({
  setOutput,
  input: { placeholder, value = "" },
}) => {
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
  return <span>{content}</span>;
};

const Calc: React.FC<any> = ({ input: { num1 = 0, num2 = 0 } }) => {
  return <span>{num1 * num2}</span>;
};

const components = {
  Input,
  Text,
  Calc,
};
const template: Protocol.Main = {
  version: "1",
  content: [
    {
      name: "Input",
      input: {
        value: { $input: "num1" },
        placeholder: "number1",
      },
      output: {
        $output: "num1",
      },
    },
    {
      name: "Text",
      input: {
        content: "*",
      },
    },
    {
      name: "Input",
      input: {
        value: { $input: "num2" },
        placeholder: "number2",
      },
      output: {
        $output: "num2",
      },
    },
    {
      name: "Text",
      input: {
        content: "=",
      },
    },
    {
      name: "Calc",
      input: {
        num1: { $input: "num1" },
        num2: { $input: "num2" },
      },
    },
  ],
};

function App() {
  // const [value, setValue] = React.useState({});

  // const handleChange = React.useCallback(
  //   (value) => {
  //     setValue(value);
  //   },
  //   [setValue]
  // );
  return (
    <div>
      <CookerRoot value={{}} template={template} components={components} />
    </div>
  );
}

export default App;