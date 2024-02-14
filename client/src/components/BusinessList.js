import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import BusinessCard from "./BusinessCard"
import SearchBusiness from "./SearchBusiness"


function BusinessList({ businesses, searchTerm, onHandleSearchChange }) {
    return (
        <div>
            <SearchBusiness searchTerm={searchTerm} onHandleSearchChange={onHandleSearchChange} />
            <ul className="business_cards">
                {businesses.map(business => <BusinessCard key={business.id} business={business} />)}
            </ul>
        </div>
    )
}

export default BusinessList;