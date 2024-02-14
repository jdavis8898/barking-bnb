import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import BusinessCard from "./BusinessCard"


function BusinessList({businesses}) {
    return (
        <ul className="cards">
            {businesses.map(business => <BusinessCard key={business.id} business={business} />)}
        </ul>
    )
}

export default BusinessList;