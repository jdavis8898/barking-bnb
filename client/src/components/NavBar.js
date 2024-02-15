import React from "react"
import { Link } from "react-router-dom"

function NavBar({ owner, onLogout }) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout())
    }

    return (
        <header>
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
                {owner ? (
                    <div>
                        <p>
                            Welcome, {owner.name}!
                        </p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link
                        className="login-button"
                        to="/login">
                        Login
                    </Link>
                )}
            </div>
        </header>
    )
}

export default NavBar