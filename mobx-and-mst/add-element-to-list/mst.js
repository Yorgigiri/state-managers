// Добавление элементов в список
// В MST каждый элемент списка должен соответствовать модели, что обеспечивает большую безопасность типов.
import { types } from 'mobx-state-tree';

const Todo = types.model('Todo', {
  text: types.string,
  done: types.boolean,
});

const TodoStore = types.model('TodoStore', {
  todos: types.array(Todo),
}).actions(self => ({
  addTodo(text) {
    self.todos.push({ text, done: false });
  },
}));

const store = TodoStore.create({ todos: [] });
store.addTodo('Buy beer');
console.log(store.todos); // [{ text: 'Buy beer', done: false }]