import ReactDOM from 'react-dom/client';
import router from './Router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <QueryClientProvider client={queryClient}>
   
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
  </QueryClientProvider>
  </ChakraProvider>
);
