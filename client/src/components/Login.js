import React, { useState } from "react";


function Login({ onLogin }) {
    const [username, setUsername] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Conent-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(user => onLogin(user))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login