import React from "react";
import "./header.css";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid">
                <a className="navbar-brand col-lg-3 col-12 me-0 text-center" href="#">Where to Next?</a>
                <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarsExample11">
                    <div className="d-lg-flex col-lg-9 col-12 justify-content-lg-end">
                        <button className="btn btn-primary">History</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;
