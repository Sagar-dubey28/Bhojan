import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { Car } from 'lucide-react'
import { CartProvider } from './Context/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
       <CartProvider>
         <App />
       </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
