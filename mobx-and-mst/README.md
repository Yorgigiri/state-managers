# MOBX & MOBX-STATE-TREE

## Основные различия между MobX и MobX State Tree

### Управление состоянием

**MobX**: Состояние может быть организовано в виде простых объектов, массивов или примитивов. Нет строгой структуры.  
**MobX State Tree**: Состояние организовано в виде дерева с четко определенной структурой. Все данные должны соответствовать моделям.  

### Типизация

**MobX**: По умолчанию не поддерживает строгую типизацию. Для TypeScript требуется дополнительная настройка.  
**MobX State Tree**: Имеет встроенную поддержку типизации через модели. Это делает код более безопасным.  

### Иммутабельность

**MobX**: Позволяет изменять состояние напрямую (mutability), что может привести к ошибкам.  
**MobX State Tree**: Обеспечивает иммутабельность по умолчанию, гарантируя, что изменения состояния происходят безопасно.  

### Асинхронные действия

**MobX**: Нету встроенной реализации  
**MobX State Tree**: flow  

### Сохранение состояния

**MobX**: Нету встроенной реализации  
**MobX State Tree**: getSnapshot / applySnapshot  

## Преимущества и недостатки

### Преимущества MobX

Простота использования.  
Маленький размер.  
Гибкость в организации состояния.  

### Преимущества MobX State Tree

Четкая структура состояния.  
Встроенная типизация.  
Иммутабельность по умолчанию.  
Легкость масштабирования.  

### Недостатки MobX

Отсутствие строгой типизации.  
Вероятность ошибок из-за мутаций.  

### Недостатки MobX State Tree

Более сложная настройка.  
Больше кода для определения моделей.  

## MobX: Базовые методы и концепции
**observable** - Делает данные реактивными. Когда эти данные изменяются, все зависящие от них компоненты автоматически обновляются.

```javascript
import { makeObservable, observable } from "mobx";

class User {
  name = "John";
  age = 30;

  constructor() {
    makeObservable(this, {
      name: observable,
      age: observable,
    });
  }
}

const user = new User();
user.name = "Alice"; // Изменение будет автоматически отслеживаться
```
$~$

**action** - Оборачивает функцию или метод, чтобы пометить её как действие, которое может изменять состояние. Это помогает MobX понимать, что изменения происходят в рамках контролируемого действия.

```javascript
import { makeObservable, observable, action } from "mobx";

class Counter {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }

  increment() {
    this.count += 1; // Без action это вызовет предупреждение
  }
}

const counter = new Counter();
counter.increment(); // count увеличится на 1
```
$~$

**computed** - Создает вычисляемые свойства, которые автоматически обновляются при изменении зависимых данных.

```javascript
import { makeObservable, observable, computed } from "mobx";

class User {
  firstName = "John";
  lastName = "Doe";

  constructor() {
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      fullName: computed,
    });
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user = new User();
console.log(user.fullName); // "John Doe"
user.firstName = "Alice";
console.log(user.fullName); // "Alice Doe"
```
$~$

**autorun** - Автоматически выполняет функцию всякий раз, когда изменяются зависимые данные.

```javascript
import { makeObservable, observable, autorun } from "mobx";

class Counter {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
    });
  }
}

const counter = new Counter();

autorun(() => {
  console.log(`Counter value is: ${counter.count}`);
});

counter.count = 1; // Выведет: Counter value is: 1
counter.count = 2; // Выведет: Counter value is: 2
```
$~$

**reaction** - Выполняет функцию при изменении определенных данных. Похож на autorun, но позволяет более точно контролировать зависимости.

```javascript
import { makeObservable, observable, reaction } from "mobx";

class User {
  isLoggedIn = false;

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
    });
  }
}

const user = new User();

reaction(
  () => user.isLoggedIn, // Отслеживаемое значение
  (isLoggedIn) => {
    if (isLoggedIn) {
      console.log("User logged in");
    } else {
      console.log("User logged out");
    }
  }
);

user.isLoggedIn = true; // Выведет: User logged in
user.isLoggedIn = false; // Выведет: User logged out
```

## MobX State Tree (MST): Базовые методы и примеры
**types.model** - Определяет модель данных с указанием структуры и типов.

```javascript
import { types } from "mobx-state-tree";

const Todo = types.model("Todo", {
  id: types.identifier, // Уникальный идентификатор
  text: types.string,
  done: types.boolean,
});
```
$~$

**actions** - Определяет методы для изменения состояния модели.

```javascript
import { types } from "mobx-state-tree";

const Todo = types
  .model("Todo", {
    text: types.string,
    done: types.boolean,
  })
  .actions((self) => ({
    toggleDone() {
      self.done = !self.done;
    },
  }));
```
$~$

**views** - Создает вычисляемые свойства для модели, аналогично computed в MobX.

```javascript
import { types } from "mobx-state-tree";

const Todo = types
  .model("Todo", {
    text: types.string,
    done: types.boolean,
  })
  .views((self) => ({
    get isCompleted() {
      return self.done;
    },
  }));
```
$~$

**flow** - Используется для работы с асинхронными операциями, сохраняя реактивность.

```javascript
import { types, flow } from "mobx-state-tree";

const DataStore = types
  .model("DataStore", {
    data: types.maybeNull(types.frozen()),
  })
  .actions((self) => ({
    fetchData: flow(function* () {
      try {
        const response = yield fetch("https://api.example.com/data");
        const result = yield response.json();
        self.data = result;
      } catch (error) {
        console.error(error);
      }
    }),
  }));
```
$~$

**create** - Создает экземпляр модели с заданными данными.

```javascript
import { types } from "mobx-state-tree";

const Todo = types.model("Todo", {
  text: types.string,
  done: types.boolean,
});

const todo = Todo.create({ text: "Buy milk", done: false });
console.log(todo.text); // "Buy milk"
```
$~$

**applySnapshot** - Применяет новое состояние к модели.  
**getSnapshot** - Получает текущее состояние модели в виде плоского объекта.

```javascript
import { types } from "mobx-state-tree";

const Todo = types.model("Todo", {
  text: types.string,
  done: types.boolean,
});

const todo = Todo.create({ text: "Buy milk", done: false });

// Получение снэпшота
const snapshot = todo.getSnapshot();
console.log(snapshot); // { text: 'Buy milk', done: false }

// Применение нового снэпшота
todo.applySnapshot({ text: "Buy bread", done: true });
console.log(todo.text); // "Buy bread"
```
$~$

**when** - Выполняет функцию, когда определенное условие становится истинным.

```javascript
import { types, when } from "mobx-state-tree";

const Counter = types
  .model("Counter", {
    count: types.number,
  })
  .actions((self) => ({
    increment() {
      self.count += 1;
    },
  }));

const counter = Counter.create({ count: 0 });

when(
  () => counter.count >= 5,
  () => {
    console.log("Counter reached 5!");
  }
);

counter.increment(); // Не выполнится
counter.increment(); // Не выполнится
counter.increment(); // Не выполнится
counter.increment(); // Не выполнится
counter.increment(); // Выведет: Counter reached 5!
```
