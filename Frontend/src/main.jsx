import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from './pages/Customer.jsx'
import Layout from './components/layout/Layout.jsx'
import Orders from './pages/Orders.jsx'
import Products from './pages/Products.jsx'
import CustomerForm from './pages/CustomerForm.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/customers',
        element: <Customer />,
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
