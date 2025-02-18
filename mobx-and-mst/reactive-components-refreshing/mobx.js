// Реактивное обновление компонентов Mobx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeObservable, observable, action } from 'mobx';

class CounterStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }

  increment() {
    this.count += 1;
  }
}

const store = new CounterStore();

const Counter = observer(() => {
  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
});