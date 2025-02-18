// RTK Query: Кэширование
// RTK Query автоматически кэширует данные, полученные с сервера + позволяет использовать методы кэширования
/* 
  Методы кэширования:
  invalidTags
    Используется для управления кэшем на уровне тега. 
    Когда вызывается этот метод, все запросы, связанные с указанными тегами, помечаются как устаревшие.

  updateQueryData
    Позволяет обновить данные конкретного запроса в кэше.

  refetch
    Принудительно обновляет данные запроса, даже если они уже находятся в кэше.

  resetApiState
    Полностью сбрасывает состояние API, включая кэшированные данные.

  onCacheEntryAdded
    Позволяет выполнять определенные действия при добавлении нового кэша.

  onCacheEntryRemoved
    Позволяет выполнять определенные действия при удалении кэша.
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = api;
