import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BusinessDetail from "./BusinessDetail"
import BusinessList from "./BusinessList"
import NewAppointmentForm from "./NewAppointmentForm"


function BusinessesPage() {
    const [businesses, setBusinesses] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [businessID, setBusinessID] = useState("")

    useEffect(() => {
        fetch("/businesses")
            .then(resp => resp.json())
            .then(setBusinesses)
    }, [])

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
            </Routes>
        </main>
    )
}

export default BusinessesPage