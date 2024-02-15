import React from "react"

function DogCard({ dog, handleDeletePup }) {
    function handleClick() {
        handleDeletePup(dog)
    }

    return (
        <div>
            <p className="dog_info">
                Name: {dog.name}
            </p>
            <p className="dog_info">
                Breed: {dog.breed}
            </p>
            <button className="delete" onClick={handleClick}>Delete</button>
        </div>
    )
}

export default DogCard