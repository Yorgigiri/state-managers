
// React Query: Кэширование
// React Query автоматически кэширует данные, полученные с сервера + позволяет использовать методы кэширования

/* 
    Методы кэширования:
    invalidateQueries
        Принудительно помечает запросы как устаревшие и вызывает их повторное выполнение.

    removeQueries
        Удаляет запросы из кэша.

    setQueryData
        Позволяет обновить данные конкретного запроса в кэше.

    refetchQueries
        Принудительно вызывает повторное выполнение указанных запросов.

    clear
        Полностью очищает кэш.

    resetQueries
        Сбрасывает состояние всех запросов.

    onQueryCacheNotify
        Позволяет подписаться на уведомления о событиях кэша.

    updateQueries
        Обновляет данные запросов на основе условия.

    cancelQueries
        Отменяет выполнение запросов.
*/

import { useQuery } from "react-query";
import axios from "axios";

function Posts() {
  const { data, error, isLoading } = useQuery("posts", () =>
    axios.get("/api/posts")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data.data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Posts;
