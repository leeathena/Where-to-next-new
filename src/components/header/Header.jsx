import React from "react";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                    <a className="navbar-brand col-lg-3 col-12 me-0" href="#">Where to Next?</a>

                    <div className="d-lg-flex col-lg-9 col-12 justify-content-lg-end">
                        <button className="btn btn-primary">History</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;
