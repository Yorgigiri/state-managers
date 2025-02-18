// Создание состояния
// В MST состояние организовано в виде модели, что делает его более предсказуемым и типизированным.

import { types } from 'mobx-state-tree';

const User = types.model('User', {
  name: types.string,
  age: types.number,
}).actions(self => ({
  update(name, age) {
    self.name = name;
    self.age = age;
  },
}));

const Store = types.model('Store', {
  user: User,
});

const store = Store.create({ user: { name: '', age: 0 } });
store.user.update('Gilticus', 30);
console.log(store.user); // { name: 'Gilticus', age: 30 }