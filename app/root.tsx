import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import React, { useRef } from "react";
import type { Route } from "./+types/root";
import "./app.css";

interface Param {
  id: number;
  name: string;
  type: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

interface Color {}

interface State {
  paramValues: { [PId in number]: string };
}
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: {},
    };
  }
  public getModel(): Model {
    const { paramValues } = this.state;

    return {
      colors: [],
      paramValues: Object.entries(paramValues).map(([key, value]) => ({
        paramId: Number(key),
        value,
      })),
    };
  }

  private handleParamChange(id: number, value: string) {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [id]: value,
      },
    }));
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;
    return (
      <div>
        {params.map((param) => (
          <div key={param.id} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {param.name}
            </label>
            <input
              type="text"
              value={paramValues[param.id] || ""}
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
        ))}
      </div>
    );
  }
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "средняя" },
  ],
  colors: [],
};

export default function App() {
  const ref = useRef<ParamEditor>(null);

  const handleGetModel = () => {
    const model = ref?.current?.getModel();
    console.log(model);
  };

  return (
    <div>
      <ParamEditor model={model} params={params} ref={ref} />
      <button onClick={handleGetModel}>Get Model</button>
    </div>
  );
}
