import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./NavBar"
import BusinessesPage from "./BusinessesPage"
import OwnerPage from "./OwnerPage"
import Login from "./Login"


function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleIsLoggedIn() {
        setIsLoggedIn(!isLoggedIn)
    }


    return (
        <div>
            <NavBar />
            <Link to={`/businesses`}>
                <button>Browse all doggie daycares</button>
            </Link>
            <BusinessesPage />
            <OwnerPage />
            {/* <Routes>
                <Route
                    path="/login"
                    element={<Login handleIsLoggedIn={handleIsLoggedIn} />}
                />
            </Routes> */}
        </div>
    )
}

export default Home