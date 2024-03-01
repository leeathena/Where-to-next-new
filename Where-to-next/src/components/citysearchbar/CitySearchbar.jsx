import React from "react"

function CitySearchbar() {
    // set up the state for the input value so that i can keep track of what the users types
    // set a submit function when the search button is clicked to add to a list of cities 
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
        // add another div container to show the results
    )
}

export default CitySearchbar