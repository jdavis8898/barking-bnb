import React from "react";


function SearchBusiness({ searchTerm, onHandleSearchChange }) {
    function handleChange(e) {
        onHandleSearchChange(e)
    }

    return (
        <div className="searchbar">
            <label htmlFor="search">Search for Doggie Daycare:</label>
            <input
                type="text"
                id="search"
                placeholder="Type name of businessto search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchBusiness