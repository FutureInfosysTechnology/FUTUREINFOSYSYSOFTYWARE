import React from "react";
import './Logo.css';
import '../Dashboard/Mainstyle.css';
import future from '../../Assets/Images/LOGO.jfif'

function Logo() {
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    }
    return (
        <div className="d-flex align-items-center justify-content-between">
            <i className="bi bi-list toggle-sidebar-btn"
                id="toggle-btn"
                onClick={handleToggleSidebar}></i>
            <a href="/" className="logo d-flex align-items-center" style={{ textDecoration: "none" }}>
            <img src={future} className="logo-img" style={{width:"50px",height:"50px"}} />
            
            </a>

            

        </div>
    )
}

export default Logo;