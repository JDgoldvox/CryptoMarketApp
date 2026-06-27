import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Portfolio from './pages/Portfolio.tsx'
import Market from './pages/Market.tsx'
import Landing from './pages/Landing.tsx'

const router : any = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Landing,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "portfolio",
                Component: Portfolio,
            },
            {
                path: "market",
                Component: Market,
            }
                       
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)