import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'

const router : any = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: "dashboard",
                    Component: Dashboard,
                },
                // {
                //    
                // },
            ]
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)