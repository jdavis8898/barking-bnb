import React, { useState } from "react"

function AddDogForm({ owner, handleOwnerUpdate }) {
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        owner_id: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const name = e.target.name.value
        const breed = e.target.breed.value

        const updatedForm =
        {
            name: name,
            breed: breed,
            owner_id: owner.id
        }

        setFormData(updatedForm)

        fetch("/dogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedForm)
        })
            .then(resp => resp.json())
            .then(newDog => {
                setFormData({
                    name: "",
                    breed: "",
                    owner_id: ""
                })
            })
            .catch(error => {
                console.error("Error adding new dog:", error)
            })
    }

    return (
        <div className="add_dog_form">
            <h2>Add Your Dog Here!</h2>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Dog's Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="breed"
                    placeholder="Dog's Breed"
                    value={formData.breed}
                    onChange={handleChange}
                />
                <button type="submit">Submit New Dog</button>
            </form>
        </div>
    )
}

export default AddDogForm