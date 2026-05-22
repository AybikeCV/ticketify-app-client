import { useState } from "react"
import "./App.css"
import "./index.css"
import { Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"


function App() {
 

  return (
    
    <>
      <Navbar />
      <Home/>
    </>
  )
}

export default App
