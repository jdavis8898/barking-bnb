import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BusinessDetail from "./BusinessDetail"
import BusinessList from "./BusinessList"
import NewAppointmentForm from "./NewAppointmentForm"
import Login from "./Login"


function BusinessesPage() {
    const [user, setUser] = useState(null)
    const [businesses, setBusinesses] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [businessID, setBusinessID] = useState("")

    // useEffect(() => {
    //     fetch("/check_session")
    //         .then(resp => {
    //             if (resp.ok) {
    //                 resp.json()
    //                     .then(user => setUser(user))
    //             }
    //         })
    // }, [])


    useEffect(() => {
        fetch("/businesses")
            .then(resp => resp.json()).then(setBusinesses)
    }, [])

    function handleSetUser(username) {
        setUser(username)
    }

    function onHandleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    const filteredBySearch = businesses.filter(business => {
        if (business.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true
        }
    })

    function handleBusinessID(id) {
        setBusinessID(id)
    }

    return (
        <main>
            <Routes>
                <Route
                    path="/businesses"
                    element={<BusinessList businesses={filteredBySearch}
                        searchTerm={searchTerm}
                        onHandleSearchChange={onHandleSearchChange} />}
                />
                <Route
                    path="/businesses/:id"
                    element={<BusinessDetail handleBusinessID={handleBusinessID} />}
                />
                <Route
                    path="/new_appointment_form"
                    element={<NewAppointmentForm businessID={businessID} />}
                />
                <Route
                    path="/login"
                    element={<Login onLogin={handleSetUser} />}
                />
            </Routes>
        </main>
    )
}

export default BusinessesPage;