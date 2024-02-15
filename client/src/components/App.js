import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import NavBar from "./NavBar"
import Login from "./Login"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
      .then(resp => {
        if (resp.ok) {
          resp.json()
            .then(user => setUser(user))
        }
      })
  }, [])

  function handleSetUser(username) {
    setUser(username)
  }

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleSetUser} />}
        />
      </Routes>
    </div>
  )
}

export default App;