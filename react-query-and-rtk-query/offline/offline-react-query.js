
// React Query: Оффлайн режим
// React Query поддерживает оффлайн режим с использованием queryClient и hydrateCache.

import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={window.__REACT_QUERY_STATE__}>
        <Posts />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
