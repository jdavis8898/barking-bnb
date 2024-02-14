import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import Home from "./Home"
import NavBar from ".NavBar"

function App() {
  return (
    <div className="app">
      <NavBar />
      <Home />
    </div>
  )
}

export default App;