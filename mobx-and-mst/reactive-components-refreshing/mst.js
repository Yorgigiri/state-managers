// Реактивное обновление компонентов MST
// В обоих случаях используется декоратор observer, но в MST модель явно определяется как часть дерева состояний.
import React from 'react';
import { observer } from 'mobx-react-lite';
import { types } from 'mobx-state-tree';

const Counter = types.model('Counter', {
  count: types.number,
}).actions(self => ({
  increment() {
    self.count += 1;
  },
}));

const store = Counter.create({ count: 0 });

const CounterComponent = observer(() => {
  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
});