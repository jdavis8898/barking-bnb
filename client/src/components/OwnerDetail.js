import React, { useState } from "react"
import { Link } from "react-router-dom"
import DogCard from "./DogCard"
import AddDogForm from "./AddDogForm"

function OwnerDetail({ user, dogs, handleDeletePup, handleUserUpdate }) {
    const initialForm = {
        phone_number: "",
        email: "",
    }

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(initialForm)


    function handleClickEditing() {
        setIsEditing(!isEditing)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`/owners/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(resp => resp.json())
            .then(editedOwner => handleUserUpdate(editedOwner))

        setIsEditing(!isEditing)
    }


    return (
        <div>
            <h3>Your Information:</h3>
            {isEditing ? (
                <div className="edit_user_info">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="phone_number"
                            placeholder={user.phone_number}
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder={user.email}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            ) : (
                <div className="owner_info">
                    <p>phone_number: {user.phone_number}</p>
                    <p>email: {user.email}</p>
                    <p>username: {user.username}</p>
                    <button type="click" onClick={handleClickEditing}>Edit</button>
                </div>
            )}
            <h3>Your Pups!</h3>
            {dogs.length > 0 ? (
                dogs.map(dog =>
                    <DogCard key={dog.id} dog={dog} handleDeletePup={handleDeletePup} />)
            ) : (
                <p>No Pups to Show!</p>
            )}
            {/* <Link to="/add_dog">
                <button className="add">Add Pup</button>
            </Link> */}
        </div>
    )
}

export default OwnerDetail