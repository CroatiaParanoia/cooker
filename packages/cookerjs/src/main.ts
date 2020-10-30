import Store from "./Store";
import {
  isContainer,
  isDynamicInput,
  isDynamicOutput,
  isDynamicStore,
} from "./utils/utils";
import { path as Rpath } from "ramda";

import "./types/stateType";
import "./types/protocol";
class Node {
  input$: Store<StateType.Input$>;
  output$: Store<StateType.Output$>;
  protocol$: Store<StateType.Protocol$>;
  value$: Store<StateType.Value$>;
  dataSource$: Store<StateType.dataSource$>;
  store$: Store<StateType.Store$>;

  _children: Node[] | null = null;
  path: string[];

  constructor(
    path: string[],
    protocol$: Store<Protocol.Main>,
    value$: Store<StateType.Value$>,
    dataSource$: Store<StateType.dataSource$>,
    store$: Store<StateType.Store$>
  ) {
    const realPath = path
      .map((v) => [v, "children"])
      .flat()
      .slice(0, -1);
    this.path = realPath;
    this.protocol$ = protocol$;
    this.dataSource$ = dataSource$;
    this.store$ = store$;

    this.value$ = value$;

    this.input$ = new Store({});
    this.output$ = new Store(null as StateType.Output$);

    this.output$.subscribe((outputValue) => {
      if (!this.curTemplate || isContainer(this.curTemplate)) return;
      const { output } = this.curTemplate;

      if (isDynamicOutput(output)) {
        const curValue = this.value$.getValue();
        this.value$.setValue({ ...curValue, [output.$output]: outputValue });
      }

      if (isDynamicStore(output)) {
        const curStore = this.store$.getValue();
        this.value$.setValue({ ...curStore, [output.$store]: outputValue });
      }
    });

    this.store$.subscribe(() => {
      if (!this.curTemplate || isContainer(this.curTemplate)) return;
      const { input } = this.curTemplate;

      const realInput = this.getInput(input);

      this.input$.setValue(realInput);
    });
  }

  get curTemplate() {
    const protocol$ = this.protocol$;
    const protocol = protocol$.getValue();
    const currentTemplate = Rpath(this.path, protocol.content) as
      | undefined
      | Protocol.Component
      | Protocol.Container;

    return currentTemplate;
  }

  getInput(input: StateType.Input$) {
    const [dataSource, store] = [this.dataSource$, this.store$].map((v) =>
      v.getValue()
    );
    const realInput = Object.entries(input).reduce((result, [k, v]) => {
      if (isDynamicInput(v)) {
        return {
          ...result,
          [k]: dataSource[v.$input],
        };
      }

      if (isDynamicStore(v)) {
        return {
          ...result,
          [k]: store[v.$store],
        };
      }

      return {
        ...result,
        [k]: v,
      };
    }, {} as Record<string, any>);
    return realInput;
  }

  getChildren() {
    const value$ = this.value$;
    const protocol$ = this.protocol$;
    const dataSource$ = this.dataSource$;
    const store$ = this.store$;

    const currentTemplate = this.curTemplate;

    if (!currentTemplate) return null;
    if (isContainer(currentTemplate)) {
      const { children } = currentTemplate;

      return [...children].map((_, index) => {
        return new Node(
          [...this.path, index.toString()],
          protocol$,
          value$,
          dataSource$,
          store$
        );
      });
    } else {
      const { input } = currentTemplate;
      const realInput = this.getInput(input);

      this.input$ = new Store(realInput);
    }

    return null;
  }

  get children() {
    if (!this._children) {
      this._children = this.getChildren();
    }

    return this._children;
  }

  setOutput(value: any) {
    this.output$?.setValue(value);
  }
}

class Cookerjs {
  protocol$: Store<StateType.Protocol$>;
  value$: Store<StateType.Value$>;
  dataSource$: Store<StateType.dataSource$>;

  store$: Store<StateType.Store$>;

  _children: Node[] | null = null;

  constructor(protocol: Protocol.Main, value: any, dataSource: any) {
    this.protocol$ = new Store(protocol);
    this.value$ = new Store(value);
    this.dataSource$ = new Store(dataSource);

    this.store$ = new Store({});
  }

  get children() {
    const { content } = this.protocol$.getValue();
    if (!this._children) {
      this._children = content.map((v, index) => {
        return new Node(
          [index.toString()],
          this.protocol$,
          this.value$,
          this.dataSource$,
          this.store$
        );
      });
    }

    return this._children;
  }

  subscribe(fn: (v: any) => void) {
    this.value$.subscribe(fn);
  }
}

export default Cookerjs;

export type Template = Protocol.Main;

export { isContainer };
