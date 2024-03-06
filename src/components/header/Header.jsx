import React from "react";
import "./header.css";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                {/* Update this line */}
                <a className="navbar-brand" href="#" onClick={() => window.location.reload()}>
                    Where to Next?
                </a>
            </div>
        </nav>
    );
}

export default Header;
