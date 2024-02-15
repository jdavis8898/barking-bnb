import React, { useState } from "react";


function NewAppointmentForm({ businessID }) {

    const [formData, setFormData] = useState({
        price: "",
        in_time: "",
        out_time: "",
        in_date: "",
        out_date: "",
        dog_id: "",
        business_id: parseInt(businessID)
    });

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const apptPrice = Math.random() * 100
        const apptInTime = parseInt(e.target.in_time.value)
        const apptOutTime = parseInt(e.target.out_time.value)
        const apptInDate = e.target.in_date.value
        const apptOutDate = e.target.out_date.value
        const apptDogId = parseInt(e.target.dog_id.value)
        const apptBusinessId = parseInt(businessID)


        const updatedForm =
        {
            price: apptPrice,
            in_time: apptInTime,
            out_time: apptOutTime,
            in_date: apptInDate,
            out_date: apptOutDate,
            dog_id: apptDogId,
            business_id: apptBusinessId
        }

        setFormData(updatedForm)

        fetch("/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedForm),
        })
            .then((resp) => resp.json())
            .then((newAppointment) => {
                console.log("Need to add to owner once that is built")

                setFormData({
                    price: "",
                    in_time: "",
                    out_time: "",
                    in_date: "",
                    out_date: "",
                    dog_id: "",
                    business_id: 0
                })
            })
            .catch((error) => {
                console.error("Error creating new appointment:", error);
            });
    };

    return (
        <div className="new_appointment_form">
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="in_date"
                    placeholder="Check-in Date (MMDDYYYY)"
                    value={formData.in_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="out_date"
                    placeholder="Check-out Date (MMDDYYYY)"
                    value={formData.out_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="in_time"
                    placeholder="Check-in Time (700-1200)"
                    value={formData.in_time}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="out_time"
                    placeholder="Check-out Time (1230-1900)"
                    value={formData.out_time}
                    onChange={handleChange}
                />
                {/* <input
                    type="text"
                    name="out_time"
                    placeholder="Check-out Time (0700-1900)"
                    value={formData.out_time}
                    onChange={handleChange}
                /> */}
                <input
                    type="text"
                    name="dog_id"
                    placeholder="Enter Dog ID"
                    value={formData.dog_id}
                    onChange={handleChange}
                />
                <button type="submit">Submit Appointment</button>
            </form>
        </div>
    )
}

export default NewAppointmentForm;