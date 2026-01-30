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
   
const [walletBalance, setWalletBalance] = useState(0);
const [walletAmount, setWalletAmount] = useState(0);

    
const getWalletLedger = async (CustomerCode) => {
    if (!CustomerCode) return;

    try {
        const response = await getApi(`/Master/getWalletLedger?Customer_Code=${CustomerCode}`);

        if (response.status === 1 && response.Data.length > 0) {
            const lastIndex = response.Data.length - 1;
            const lastRow = response.Data[lastIndex];

            setWalletBalance(lastRow.Balance);
            setWalletAmount(lastRow.CreditAmount);
        } else {
            setWalletBalance(0);
            setWalletAmount(0);
        }
    } catch (error) {
        console.error(error);
        setWalletBalance(0);
        setWalletAmount(0);
    }
};
useEffect(() => {
    getWalletLedger(JSON.parse(localStorage.getItem('Login'))?.Customer_Code);
}, []);



    return (
        <header id="header" className="header fixed-top d-flex align-items-center justify-content-between ">
            <Logo />
            {JSON.parse(localStorage.getItem('Login'))?.UserType=="User" && <div className="credit-box" style={{ marginLeft: "10px", display: "flex", gap: "10px", justifyContent: "center", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "bold" }}>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Add.Wallet : {walletAmount}</span>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Balance : {walletBalance}</span>
            </div>}
            <Searchbar />
            <Nav />
            
        </header>
    )
};


export default Header;