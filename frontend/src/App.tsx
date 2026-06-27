import { useState } from 'react'
import { Outlet } from "react-router";
import NavBar from "./components/navbar/NavBar.tsx";
import './App.css'

function App() {

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App
