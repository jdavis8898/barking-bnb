import React, { useEffect, useState } from "react"

function Login({ handleIsLoggedIn }) {
    const [owners, setOwners] = useState([])
    const [formData, setFormData] = useState({
        id: ""
    })

    useEffect(() => {
        fetch("/owners")
            .then(resp => resp.json())
            .then(setOwners)
    }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        owners.forEach(owner => {
            if (e.target.owner_id.value === owner.id) {
                handleIsLoggedIn()
            }

            else {
                alert("User ID does not exist")

                setFormData({
                    id: ""
                })
            }

            setFormData({
                id: ""
            })
        })
    }

    return (
        <div className="login_form">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="owner_id"
                    placeholder="Enter User ID"
                    value={formData.id}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login