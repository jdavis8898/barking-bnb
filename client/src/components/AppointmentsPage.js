import React, { useState, useEffect } from "react"
import AppointmentCard from "./AppointmentCard"

function AppointmentsPage({ owner, dog }) {
    const [appointments, setAppointments] = useState([])
    const dogAppt = []


    appointments.forEach(appt => {
        if (appt.dog_id === dog.id) {
            dogAppt.append(appt)
        }
    })

    useEffect(() => {
        fetch("/appointments")
            .then(resp => resp.json())
            .then(apptData => setAppointments(apptData))
    }, [])


    return (
        <div>
            {dogAppt.length ? (
                dogAppt.map(appt =>
                    <AppointmentCard key={appt.id} appt={appt} owner={owner} />)
            ) : (
                <p>No Appointments to Show!</p>
            )}
        </div>
    )
}

export default AppointmentsPage