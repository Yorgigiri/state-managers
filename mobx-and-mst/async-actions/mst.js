// Асинхронные действия
// MST использует flow для работы с асинхронными операциями, что позволяет сохранить реактивность даже при ожидании данных.
import { types, flow } from 'mobx-state-tree';

const DataStore = types.model('DataStore', {
  data: types.maybeNull(types.frozen()),
}).actions(self => ({
  fetchData: flow(function* () {
    try {
      const response = yield fetch('https://api.example.com/data');
      const result = yield response.json();
      self.data = result;
    } catch (error) {
      console.error(error);
    }
  }),
}));

const store = DataStore.create({ data: null });
store.fetchData().then(() => console.log(store.data));