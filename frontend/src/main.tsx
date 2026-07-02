import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Portfolio from './pages/Portfolio.tsx'
import Market from './pages/Market.tsx'
import Landing from './pages/Landing.tsx'
import {AuthService} from './services/AuthService.ts'

const protectedLoader = async () => {
    if (!AuthService.isAuthenticated()) {
        throw redirect("/login");
    }
    return null;
}

const router : any = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Landing,
                loader: protectedLoader,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "portfolio",
                Component: Portfolio,
                loader: protectedLoader,
            },
            {
                path: "market",
                Component: Market,
                loader: protectedLoader,
            }
                       
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)