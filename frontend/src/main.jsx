import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import ChakraProvider from Chakra UI
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your entire app inside ChakraProvider */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
