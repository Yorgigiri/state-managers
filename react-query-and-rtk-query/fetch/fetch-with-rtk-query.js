import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* 
    # Необходимо предварительно настроить API с помощью createApi 
*/

const apiSlice = createApi({
  reducerPath: "beerApi", // Уникальное имя для API
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }), // Базовый URL для запросов
  endpoints: (builder) => ({
    getBeerByCategory: builder.query({
      query: (category) => `${category}`, // Динамический путь для категории
    }),
  }),
});

export const { useGetBeersByCategoryQuery } = apiSlice;

/* ========================================================== */

// в компоненте достаём из хука состояния и data
function Beers({ category }) {
  // Используем хук RTK Query для выполнения запроса
  const { data, error, isLoading } = useGetBeersByCategoryQuery(category);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message || "Failed to fetch"}</div>;
  }

  return (
    <div>
      <h1>Beers for {category}</h1>
      <ul>
        {data?.map((item, index) => (
          <li key={index}>{item.name || item.title}</li>
        ))}
      </ul>
    </div>
  );
}
