import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import OwnerDetail from "./OwnerDetail"
import AddDogForm from "./AddDogForm"

function OwnerPage({ user, handleUserUpdate }) {
    const [dogs, setDogs] = useState([user.dogs])

    // useEffect(() => {
    //     fetch("/dogs")
    //         .then(resp => resp.json()).then(dogData => {
    //             const updatedDogs = dogData.filter(dog => {
    //                 if (dog.owner === user) {
    //                     return true
    //                 }
    //             })
    //             setDogs(updatedDogs)
    //         })
    // }, [])


    function handleDeletePup(deleteDog) {
        fetch(`/dogs/${deleteDog.id}`, {
            method: "DELETE",
        })
            .then(resp => resp.json())
            .then(deletedDogResponse => {
                const updatedDogs = user.dogs.filter(dog => dog.id !== deleteDog.id)
                setDogs(updatedDogs)
            })
    }


    return (
        <div>
            <div>{user.dog}</div>
            <OwnerDetail user={user} dogs={dogs} handleDeletePup={handleDeletePup} handleUserUpdate={handleUserUpdate} />
            <Routes>
                <Route
                    path="/add_dog"
                    element={<AddDogForm user={user} />}
                />
            </Routes>
            {/* <AddDogForm user={user} handleUserUpdate={handleUserUpdate}/> */}
        </div>
    )
}

export default OwnerPage