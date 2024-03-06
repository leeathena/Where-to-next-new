import React from "react";
import "./header.css"; // Ensure this import path is correct

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <a className="navbar-brand" href="#" onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor link behavior
                    window.location.reload(); // Reload the page
                }}>
                    Where to Next?
                </a>
            </div>
        </nav>
    );
}

export default Header;
