import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. HTML id 'root' is missing.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
