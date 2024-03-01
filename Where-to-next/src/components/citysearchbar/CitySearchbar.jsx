import React from "react" //added the use state hook from react {useState}

function CitySearchbar() {
    // set up the state for the input value so that i can keep track of what the users types
    // Const [input,setInput]=useState("");

    //fetching data from the weather API
    // const fetchData = (value) => {
    //     fetch("<https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then(json =>{
    //         console.log(json);
    //     });
    // }

    // const handleChange = (value) => {
    //     setInput(value)
    //     fetchData(value)
    // }

    // set a submit function when the search button is clicked to add to a list of cities 
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        {/* value={input} onChange={(e)=>handleChange(e.target.value)} */}
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
            {/* add another div container to show the results */}
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative mt-3">
                        <div class="col p-4 d-flex flex-column position-static px-lg-5">
                            <strong class="d-inline-block mb-2 text-primary-emphasis">Weather</strong>
                            <h3 class="mb-0">Featured post</h3>
                            <div class="mb-1 text-body-secondary">Nov 12</div>
                            <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                                Continue reading
                                <svg class="bi"><use xlink:href="#chevron-right" /></svg>
                            </a>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative mt-3">
                        <div class="col p-4 d-flex flex-column position-static px-lg-5">
                            <strong class="d-inline-block mb-2 text-success-emphasis">Exchange Rate</strong>
                            <h3 class="mb-0">Post title</h3>
                            <div class="mb-1 text-body-secondary">Nov 11</div>
                            <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                                Continue reading
                                <svg class="bi"><use xlink:href="#chevron-right" /></svg>
                            </a>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CitySearchbar