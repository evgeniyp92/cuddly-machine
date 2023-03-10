import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { InfinitePeople } from './people/InfinitePeople';
import { InfiniteSpecies } from './species/InfiniteSpecies';

const qClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qClient}>
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
