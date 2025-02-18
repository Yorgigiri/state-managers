// Добавление элементов в список
import { makeObservable, observable, action } from 'mobx';

class TodoStore {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
    });
  }

  addTodo(text) {
    this.todos.push({ text, done: false });
  }
}

const store = new TodoStore();
store.addTodo('Buy beer');
console.log(store.todos); // [{ text: 'Buy beer', done: false }]