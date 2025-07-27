import 'modern-normalize/modern-normalize.css';
import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
