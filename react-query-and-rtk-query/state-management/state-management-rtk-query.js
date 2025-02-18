
// RTK Query: Управление состоянием
// Пример использования useGetPostsQuery
import { useGetPostsQuery } from './api';

function Posts() {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Posts;