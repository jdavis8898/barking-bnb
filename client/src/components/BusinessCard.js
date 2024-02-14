import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function BusinessCard({ business }) {
    return (
        <li className="business_card">
            <div className="card_content">
                <Link to={`/businesses/${business.id}`}>
                    <h4 className="card_title">
                        {business.name}
                    </h4>
                </Link>
                <p className="card_address">
                    Address: {business.address}
                </p>
                <p className="card_phone_number">
                    Phone Number: {business.phone_number}
                </p>
            </div>
        </li>
    )
}

export default BusinessCard;