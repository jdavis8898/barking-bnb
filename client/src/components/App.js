import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import NavBar from "./NavBar"
import Login from "./Login"
import OwnerPage from "./OwnerPage"
import BusinessesPage from "./BusinessesPage"


function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   fetch("/check_session")
  //     .then(resp => {
  //       if (resp.ok) {
  //         resp.json()
  //           .then(user => setUser(user))
  //       }
  //     })
  // }, [])

  function handleLogin(user) {
    setUser(user)
  }

  function handleLogout() {
    setUser(null)
  }

  return (
    <div className="app">
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/my_profile"
          element={<OwnerPage user={user} handleUserUpdate={handleLogin} />}
        />
      </Routes>
      <BusinessesPage />
    </div>
  )
}

export default App;