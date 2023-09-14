import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient} from 'react-query';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { darkTheme } from '../Theme';
import App from './App.tsx'
import './index.css'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
      </BrowserRouter>
      {/*<ReactQueryDevtools initialIsOpen={true} />*/}
    </QueryClientProvider>
  </React.StrictMode>,
)