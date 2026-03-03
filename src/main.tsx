import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Dashboard } from '@/pages/Dashboard'
import { NewUpdate } from '@/pages/NewUpdate'
import { UpdateDetail } from '@/pages/UpdateDetail'
import { FeesList } from '@/pages/FeesList'

const router = createBrowserRouter(
  [
    { path: '/', element: <Dashboard /> },
    { path: '/new-update', element: <NewUpdate /> },
    { path: '/updates/:id', element: <UpdateDetail /> },
    { path: '/fees', element: <FeesList /> },
  ],
  { basename: '/fees-manager' }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
