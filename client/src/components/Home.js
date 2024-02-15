import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import BusinessesPage from "./BusinessesPage"

function Home() {
    return (
        <div>
            <Link to={`/businesses`}>
                <button>Browse all doggie daycares</button>
            </Link>
            <BusinessesPage />
        </div>
    )
}

export default Home