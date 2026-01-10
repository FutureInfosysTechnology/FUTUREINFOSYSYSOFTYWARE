import React from "react";
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
import { getApi } from "../../components/Admin Master/Area Control/Zonemaster/ServicesApi"; // ✅ ADD

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        CustomerCode: '',
        bookingType: '',
        remark: '',
        date: new Date(),

    })
    const handleDateChange = (date, field) => {
        setFormData(prev => ({ ...prev, [field]: date }));
    };
    const [getCustomerName, setGetCustomerName] = useState([]);
    const fetchCustomerData = async () => {
        try {
            const response = await getApi('/Master/getCustomerData');
            setGetCustomerName(Array.isArray(response.Data) ? response.Data : []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCustomerData();
    }, [])
    return (
        <header id="header" className="header fixed-top d-flex align-items-center justify-content-between ">
            <Logo />
            <div className="credit-box" style={{ marginLeft: "10px", display: "flex", gap: "10px", justifyContent: "center", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "bold" }}>
                <span style={{ display: "flex", justifyContent: "center", background: " #4FD1C5", alignItems: "center", fontSize: "40px", width: "40px", height: "40px", paddingBottom: "5px", borderRadius: "10px", cursor: "pointer" }} onClick={() => setModalIsOpen(true)}>+</span>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Wallet Amount : 100000</span>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "silver", padding: "5px", borderRadius: "5px", color: "" }}>Balance : 100000</span>
            </div>
            <Searchbar />
            <Nav />
            <Modal id="modal" overlayClassName="custom-overlay" isOpen={modalIsOpen}
                className="custom-modal-volumetric" contentLabel="Modal"
                style={{
                    content:
                    {
                        whiteSpace: "nowrap",
                    }
                }}>
                <div className="custom-modal-content" style={{}}>
                    <div className="header-tittle">
                        <header>Wallet Entry</header>
                    </div>

                    <div className='container2'>
                        <form >

                            <div className="fields2">

                                <div className="input-field">
                                    <label htmlFor="">Customer Name</label>
                                    <Select
                                        className="blue-selectbooking"
                                        classNamePrefix="blue-selectbooking"
                                        options={getCustomerName.map(cust => ({
                                            value: cust.Customer_Code,   // adjust keys from your API
                                            label: cust.Customer_Name
                                        }))}
                                        value={
                                            formData.CustomerCode
                                                ? { value: formData.CustomerCode, label: getCustomerName.find(c => c.Customer_Code === formData.CustomerCode)?.Customer_Name || "" }
                                                : null
                                        }
                                        onChange={(selectedOption) => {
                                            setFormData(pre => ({
                                                ...pre,
                                                CustomerCode: selectedOption.value,
                                            }))
                                        }}
                                        placeholder="Select Customer"
                                        isSearchable
                                        menuPortalTarget={document.body} // ✅ Moves dropdown out of scroll area
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }) // ✅ Keeps it above other UI
                                        }}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Date</label>
                                    <DatePicker
                                    portalId="root-portal"
                                        selected={formData.date}
                                        onChange={(date) => handleDateChange(date, "date")}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control form-control-sm"
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="">Booking Mode</label>
                                    <Select
                                        className="blue-selectbooking"
                                        classNamePrefix="blue-selectbooking"
                                        options={[
                                            { value: "Cash", label: "Cash" },
                                            { value: "Credit", label: "Credit" },
                                            { value: "To-pay", label: "To-pay" },
                                            { value: "Google Pay", label: "Google Pay" },
                                            { value: "RTGS", label: "RTGS" },
                                            { value: "NEFT", label: "NEFT" }
                                        ]}

                                        value={
                                            formData.bookingType
                                                ? { value: formData.bookingType, label: formData.bookingType }
                                                : null
                                        }
                                        onChange={(selected) =>
                                            setFormData({
                                                ...formData,
                                                bookingType: selected ? selected.value : "",
                                            })
                                        }
                                        placeholder="Select Booking Mode"
                                        isSearchable={false}
                                        isClearable={false}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                    />

                                </div>

                                <div className="input-field">
                                    <label htmlFor="">Remark</label>
                                    <input type="tel" value={formData.remark}
                                        onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                                        placeholder="Enter Remark" />
                                </div>
                            </div>

                            <div className='bottom-buttons'>
                                <button type='submit' className='ok-btn'>Submit</button>
                                <button type="button" onClick={() => setModalIsOpen(false)} className='ok-btn'>close</button>
                            </div>
                        </form>
                    </div>
                    <div className='container2' style={{ width: "100%" }}>
                        <div className="table-container1" style={{ width: "100%" }}>
                            <table className="table table-bordered table-sm" style={{ width: "97%", whiteSpace: "nowrap" }}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </Modal >
        </header>
    )
};


export default Header;