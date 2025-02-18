// Создание состояния
import { makeObservable, observable, action } from 'mobx';

class UserStore {
  user = { name: '', age: 0 };

  constructor() {
    makeObservable(this, {
      user: observable,
      updateUser: action,
    });
  }

  updateUser(name, age) {
    this.user.name = name;
    this.user.age = age;
  }
}

const store = new UserStore();
store.updateUser('Gilticus', 30);
console.log(store.user); // { name: 'Gilticus', age: 30 }