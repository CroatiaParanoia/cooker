import { BehaviorSubject } from "rxjs";

const STATE_KEY = Symbol("state");
const PRE_STATE_KEY = Symbol("pre-state");

class Store<T extends any> {
  [STATE_KEY] = new BehaviorSubject({} as T);

  [PRE_STATE_KEY] = {} as T;
  constructor(initState: T) {
    this[STATE_KEY].next(initState);
  }

  subscribe(fc: (v: T) => void, watchKeys: string[] = []) {
    const subscribeTemp = (value: T) => {
      if (Array.isArray(watchKeys) && watchKeys.length) {
        const oldValueArr = watchKeys.map(
          (key) => (this[PRE_STATE_KEY] as any)[key]
        );
        const newValueArr = watchKeys.map((key) => (value as any)[key]);

        const isSame = oldValueArr.every(
          (item, index) => item === newValueArr[index]
        );

        if (!isSame) {
          fc(value);
        }
      } else {
        fc(value);
      }
    };
    return this[STATE_KEY].subscribe(subscribeTemp);
  }

  getValue() {
    return this[STATE_KEY].getValue();
  }

  setValue(value: T) {
    const oldValue = this.getValue();
    this[PRE_STATE_KEY] = oldValue;
    this[STATE_KEY].next(value);
  }
}

export default Store;
