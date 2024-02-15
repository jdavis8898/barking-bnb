import React, { useState } from "react"
import DogCard from "./DogCard"
import AddDogForm from "./AddDogForm"

function OwnerDetail({ owner, dogs, handleDeletePup, handleOwnerUpdate }) {
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

        fetch(`/owners/${owner.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(resp => resp.json())
            .then(editedOwner => handleOwnerUpdate(editedOwner))

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
                            placeholder={owner.phone_number}
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder={owner.email}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            ) : (
                <div className="owner_info">
                    <p>phone_number: {owner.phone_number}</p>
                    <p>email: {owner.email}</p>
                    <p>username: {owner.username}</p>
                    <button type="click" onClick={handleClickEditing}>Edit</button>
                </div>
            )}
            <h3>Your Pups!</h3>
            {dogs.length ? (
                dogs.map(dog =>
                    <DogCard key={dog.id} dog={dog} owner={owner} handleDeletePup={handleDeletePup} />)
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