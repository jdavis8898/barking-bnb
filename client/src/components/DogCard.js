import React from "react"
import AppointmentsPage from "./AppointmentsPage"

function DogCard({ dog, owner, handleDeletePup }) {
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
            {/* <h5>Appointments:</h5>
            <AppointmentsPage dog={dog} /> */}
            <button className="delete" onClick={handleClick}>Delete Dog</button>
        </div>
    )
}

export default DogCard