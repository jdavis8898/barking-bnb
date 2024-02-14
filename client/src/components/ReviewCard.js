import React from "react"

function ReviewCard({ review }) {
    return (
        <li className="review_card">
            <div className="review_content">
                <p className="review_rating">Rating (1-10): {review.rating}</p>
                <p className="review_description">Description: {review.description}</p>
                <p className="review_owner">Made by: {review.owner.name}</p>
            </div>
        </li>
    )
}

export default ReviewCard