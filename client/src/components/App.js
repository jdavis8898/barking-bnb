import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import NavBar from "./NavBar"
import Login from "./Login"
import OwnerPage from "./OwnerPage"
import BusinessesPage from "./BusinessesPage"


function App() {
  const [owner, setOwner] = useState(null)

  // useEffect(() => {
  //   fetch("/check_session")
  //     .then(resp => {
  //       if (resp.ok) {
  //         resp.json()
  //           .then(user => setUser(user))
  //       }
  //     })
  // }, [])

  function handleLogin(owner) {
    setOwner(owner)
  }

  function handleLogout() {
    setOwner(null)
  }

  return (
    <div className="app">
      <NavBar owner={owner} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/my_profile"
          element={<OwnerPage owner={owner} handleOwnerUpdate={handleLogin} />}
        />
      </Routes>
      <BusinessesPage />
    </div>
  )
}

export default App;