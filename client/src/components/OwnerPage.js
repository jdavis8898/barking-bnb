import React, { useEffect, useState } from "react"
import OwnerDetail from "./OwnerDetail"
import AddDogForm from "./AddDogForm"

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

    // useEffect(() => {
    //     fetch("/dogs")
    //         .then(resp => resp.json()).then(dogData => {
    //             const updatedDogs = dogData.filter(dog => {
    //                 if (dog.owner === owner) {
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
                const updatedDogs = dogs.filter(dog => dog.id !== deleteDog.id)
                setDogs(updatedDogs)
                handleOwnerUpdate(owner)
            })
    }


    return (
        <div>
            <OwnerDetail owner={owner} dogs={dogs} handleDeletePup={handleDeletePup} handleOwnerUpdate={handleOwnerUpdate} />
            {/* <Routes>
                <Route
                    path="/add_dog"
                    element={<AddDogForm owner={owner} />}
                />
            </Routes> */}
            {/* <AddDogForm user={user} handleUserUpdate={handleUserUpdate}/> */}
        </div>
    )
}

export default OwnerPage