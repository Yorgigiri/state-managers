// обычный вариант с запросом и обработками ошибок

function Bookmarks({ category }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetch(`${endpoint}/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((d) => {
        if (!ignore) {
          setData(d);
          setError(undefined);
        }
      })
      .catch((e) => {
        if (!ignore) {
          setError(e);
          setData(undefined);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [category]);
}
