import { BehaviorSubject } from "rxjs";

const STATE_KEY = Symbol("state");

class Store<T extends any> {
  [STATE_KEY] = new BehaviorSubject({} as T);
  constructor(initState: T) {
    this[STATE_KEY].next(initState);
  }

  subscribe(fc: (v: T) => void) {
    this[STATE_KEY].subscribe(fc);
  }

  getValue() {
    return this[STATE_KEY].getValue();
  }

  setValue(value: T) {
    this[STATE_KEY].next(value);
  }
}

export default Store;
