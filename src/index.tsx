import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);