import Swal from "sweetalert2";
import '../Dashboard/Mainstyle.css';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts//remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getApi, postApi } from "../../components/Admin Master/Area Control/Zonemaster/ServicesApi"; // ✅ ADD

function Header() {
   
    
    



    return (
        <header id="header" className="header fixed-top d-flex align-items-center justify-content-between ">
            <Logo />
            <div className="credit-box" style={{ marginLeft: "10px", display: "flex", gap: "10px", justifyContent: "center", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "bold" }}>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Add.Wallet : 100000</span>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Balance : 100000</span>
            </div>
            <Searchbar />
            <Nav />
            
        </header>
    )
};


export default Header;