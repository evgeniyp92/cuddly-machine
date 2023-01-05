import { Posts } from './Posts';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const qClient = new QueryClient();

function App() {
    return (
        // provide React Query client to App
        <QueryClientProvider client={qClient}>
            <div className='App'>
                <h1>Blog Posts</h1>
                <Posts />
            </div>
        </QueryClientProvider>
    );
}

export default App;
