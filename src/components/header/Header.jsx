import React from "react";
import "./header.css";
import logo from "../../../public/icons/where-to-next-logo.png";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                {/* <a className="navbar-brand" href="#">Where to Next?</a> */}
                <img src={logo} alt="Logo" />
            </div>
        </nav>
    );
}

export default Header;