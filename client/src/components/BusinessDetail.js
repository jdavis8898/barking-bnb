import React, { useEffect, useState } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";
import ReviewCard from "./ReviewCard"


function BusinessDetail({ handleBusinessID }) {
    const [business, setBusiness] = useState({})
    const [reviews, setReviews] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`/businesses/${id}`)
            .then(resp => resp.json())
            .then(data => (setBusiness(data), handleBusinessID(id)))
    }, [id])

    useEffect(() => {
        fetch("/reviews")
            .then(resp => resp.json())
            .then(data => (setReviews(data)))
    }, [])

    const filteredReviews = reviews.filter(review => {
        if (review.business_id === business.id) {
            return true
        }
    })

    return (
        <div className="business_detail_container">
            <h1>{business.name}</h1>
            <h4>Address</h4>
            <p>{business.address}</p>
            <h4>Phone Number</h4>
            <p>{business.phone_number}</p>
            <h4>Reviews</h4>
            <ul className="review_cards">
                {filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </ul>
            <Link to={"/new_appointment_form"}>
                <button>Schedule Appointment</button>
            </Link>
        </div>
    )
}

export default BusinessDetail;