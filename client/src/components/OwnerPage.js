import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import OwnerDetail from "./OwnerDetail"
import AddDogForm from "./AddDogForm"
import OwnerAppointments from "./AppointmentsPage"

function OwnerPage({ owner, handleOwnerUpdate }) {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        fetch(`/owners/${owner.id}`)
            .then(resp => resp.json())
            .then(updatedOwner => {
                handleOwnerUpdate(updatedOwner)
                setDogs(updatedOwner.dogs)
            })
    }, [])

    function handleDeletePup(deleteDog) {

        const updatedDogs = dogs.filter(dog => dog.id !== deleteDog.id)

        fetch(`/dogs/${deleteDog.id}`, {
            method: "DELETE",
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                else {
                    throw new Error("Failed to delete dog")
                }
            })
            .then(() => {
                setDogs(updatedDogs)
                handleOwnerUpdate(owner)
            })
            .catch(error => { console.error("Not working", error) })
    }


    return (
        <div>
            <OwnerDetail owner={owner} dogs={dogs} handleDeletePup={handleDeletePup} handleOwnerUpdate={handleOwnerUpdate} />
            {/* <Routes>
                <Route
                    path="/add_dog"
                    element={<AddDogForm owner={owner} handleOwnerUpdate={handleOwnerUpdate} />}
                />
            </Routes> */}
            {/* <AddDogForm owner={owner} handleOwnerUpdate={handleOwnerUpdate} /> */}
        </div>
    )
}

export default OwnerPage