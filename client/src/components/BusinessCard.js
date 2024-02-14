import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import { Link } from "react-router-dom"


function BusinessCard({ business }) {
    return (
        <li className="card">
            <div className="card_content">
                <Link to={`/businesses/${business.id}`}>
                    <h4 className="card_title">
                        {business.name}
                    </h4>
                </Link>
                <p className="card_address">
                    {business.address}
                </p>
                <p className="card_phone_number">
                    {business.phone_number}
                </p>
            </div>
        </li>
    )
}

export default BusinessCard;