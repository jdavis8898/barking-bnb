import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <main>
            <header>
                <nav>
                    <div className="navigation">
                        <Link
                            className="title"
                            to="/">
                            <h1>
                                Barking B&B
                            </h1>
                        </Link>
                        <Link
                            className="nav-button"
                            to="/add_review">
                            Add a Review
                        </Link>
                        <Link
                            className="nav-button"
                            to="/my_profile">
                            My profile
                        </Link>
                        <Link
                            className="login-button"
                            to="/login">
                            Login
                        </Link>
                    </div>
                </nav>
            </header>
        </main>
    )
}

export default NavBar