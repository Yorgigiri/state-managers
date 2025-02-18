// Асинхронные действия
import { makeObservable, observable, action } from 'mobx';

class DataStore {
  data = null;

  constructor() {
    makeObservable(this, {
      data: observable,
      fetchData: action,
    });
  }

  async fetchData() {
    const response = await fetch('https://api.example.com/data');
    const result = await response.json();
    this.data = result;
  }
}

const store = new DataStore();
store.fetchData().then(() => console.log(store.data));