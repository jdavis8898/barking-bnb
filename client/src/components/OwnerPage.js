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

    function handleDeletePup(deleteDog) {

        const updatedDogs = dogs.filter(dog => dog.id !== deleteDog.id)

        fetch(`/dogs/${deleteDog.id}`, {
            method: "DELETE",
        })
            .then(resp => {
                console.log(resp)
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
                console.log("Hello. Work!")
                console.log(updatedDogs)
                console.log(`from owner page ${owner}`)
            })
            .catch(error => { console.error("Not working", error) })
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