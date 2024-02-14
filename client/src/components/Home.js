import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BusinessesPage from "./BusinessesPage"

function Home() {
    return (
        <div>
            <h1>
                Work in Progress
            </h1>
            <BusinessesPage />
        </div>
    )
}

export default Home;