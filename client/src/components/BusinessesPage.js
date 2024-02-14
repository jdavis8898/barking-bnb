import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SearchBusiness from "./SearchBusiness"
import BusinessDetail from "./BusinessDetail"
import BusinessList from "./BusinessList"


function BusinessesPage() {
    const [businesses, setBusinesses] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetch("http://localhost:5555/businesses")
        .then(resp => resp.json()).then(setBusinesses)
    }, [])

    function onHandleSearchChange(e)
    {
        setSearchTerm(e.target.value)
    }

    const filteredBySearch = businesses.filter(business => {
        if(business.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return true
        }
    })

    return (
        <main>
            <SearchBusiness searchTerm={searchTerm} onHandleSearchChange={onHandleSearchChange} />
            <Routes>
                <Route
                    path="/businesses"
                    element={<BusinessList businesses={filteredBySearch} />}
                />
                <Route
                    path="/businesses/:id"
                    element={<BusinessDetail />}
                />
            </Routes>
        </main>
    )
}

export default BusinessesPage;