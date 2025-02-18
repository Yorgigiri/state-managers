// вариант запроса fetch из файла basic-react-fetch.js но уже с использованием react-query
/* 
    Плюсы:
    1. Cостояние всегда сохраняется по входным данным (category).

    2. Сразу получаем состояния isLOading, data и error.

    3. Пустые состояния четко разделены и могут быть улучшены с помощью таких функций, как PlaceholderData.

    4. Множественные ререндеры устраняются, включая те, которые исполняются из-за StrictMode.

    ===============

    # Запросы создаются непосредственно внутри компонента через useQuery
*/
function Beers({ category }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['beers', category],
    queryFn: () =>
      fetch(`${endpoint}/${category}`).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

/*
    Отмена запроса
*/
function Beers({ category }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["beers", category],
    queryFn: ({ signal }) =>
        // берём signal и используем в запросе для автоматического прерывания запросов 
        // если категория (в примере) изменилась
      fetch(`${endpoint}/${category}`, { signal }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
