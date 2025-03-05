import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <div><Link to="/" className="navbar-brand ms-3">Campaign Management System</Link></div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent;