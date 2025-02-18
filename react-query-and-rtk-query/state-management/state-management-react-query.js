
// React Query: Управление состоянием
// React Query пример с useMutation.

import { useMutation } from "react-query";
import axios from "axios";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation((post) => axios.post("/api/posts", post));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPost;
