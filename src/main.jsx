import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router';
import AuthProvider from './Provider/AuthProvider';
import CartProvider from "./Provider/CartProvider";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <div className='container mx-auto'>
      <RouterProvider router={router} />
    </div>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
