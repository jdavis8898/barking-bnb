import React from "react"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <Link to={`/businesses`}>
                <button>Browse all doggie daycares</button>
            </Link>
        </div>
    )
}

export default Home