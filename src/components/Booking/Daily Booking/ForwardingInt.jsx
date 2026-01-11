import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Modal from 'react-modal';
import Select from "react-select";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import '../../Tabs/tabs.css';
import { getApi, postApi ,putApi} from "../../Admin Master/Area Control/Zonemaster/ServicesApi";


function ForwardingInt() {
    const [openRow, setOpenRow] = useState(null);                 // To Get Branch Data
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [getVendor, setGetVendor] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        DocketNo: "",
        VendorCode: "",
        ForwardNo: "",
        BookDate: new Date(),
    });


    const fetchVendorData = async () => {
        try {
            const response = await getApi('/Master/getVendor');
            setGetVendor(Array.isArray(response.Data) ? response.Data : []);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVendorData();
    }, []);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleUpdate = async (e) => {
    e.preventDefault();

    const requestBody = {
        DocketNo: formData.DocketNo,
        ConnentDate: formData.BookDate,     // make sure this is date/string as backend expects
        VendorAwbNo: formData.ForwardNo,    // mapping ForwardNo → VendorAwbNo
        Vendor_Code: formData.VendorCode,
    };

    try {
        const response = await putApi(
            '/Booking/UpdateVendorAwbnoforTracking',
            requestBody,
        );
        console.log(response);
        if (response.status === 1) {
            Swal.fire(
                'Updated!',
                response.message || 'Vendor AWB updated successfully.',
                'success'
            );

            setModalIsOpen(false);

            setFormData({
                DocketNo: "",
                VendorCode: "",
                ForwardNo: "",
                BookDate: new Date(),
            });

        } else {
            Swal.fire(
                'Error!',
                response.message || 'Update failed.',
                'error'
            );
        }

    } catch (error) {
        console.error("UpdateVendorAwbnoforTracking Error:", error);
        Swal.fire(
            'Error',
            'Failed to update Vendor AWB',
            'error'
        );
    }
};









    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="body">
                <div className="container1">
                    <div className="addNew">
                        <div>
                            <button className='add-btn' onClick={() => {
                                setModalIsOpen(true); 
                                setFormData({
                                    DocketNo: "",
                                    VendorCode: "",
                                    ForwardNo: "",
                                    BookDate: new Date(),
                                })
                            }}>
                                <i className="bi bi-plus-lg"></i>
                                <span>ADD NEW</span>
                            </button>

                            <div className="dropdown">
                                <button className="dropbtn"><i className="bi bi-file-earmark-arrow-down"></i> Export</button>
                                <div className="dropdown-content">
                                    <button >Export to Excel</button>
                                    <button >Export to PDF</button>
                                </div>
                            </div>
                        </div>

                        <div className="search-input">
                            <input className="add-input" type="text" placeholder="search"
                                value={searchQuery} onChange={handleSearchChange} />
                            <button type="submit" title="search">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className='table-container'>
                        <table className='table table-bordered table-sm' style={{ whiteSpace: "nowrap" }}>
                            <thead className='table-sm'>
                                <tr>
                                    <th scope="col">Actions</th>
                                    <th scope="col">Sr.No</th>
                                    <th scope="col">City Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">From Docket No</th>
                                    <th scope="col">To Docket No</th>
                                    <th scope="col">Stock Date</th>

                                </tr>
                            </thead>
                            <tbody className='table-body'>

                                {/* {currentRows.map((stock, index) => (
                                    <tr key={index} style={{ fontSize: "12px", position: "relative" }}>
                                        <td>
                                            <PiDotsThreeOutlineVerticalFill
                                                style={{ fontSize: "20px", cursor: "pointer" }}
                                                onClick={() => setOpenRow(openRow === index ? null : index)}
                                            />
                                            {openRow === index && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        flexDirection: "row",
                                                        position: "absolute",
                                                        alignItems: "center",
                                                        left: "100px",
                                                        top: "0px",
                                                        borderRadius: "10px",
                                                        backgroundColor: "white",
                                                        zIndex: "999999",
                                                        height: "30px",
                                                        width: "50px",
                                                        padding: "10px",
                                                    }}
                                                >

                                                    <button className='edit-btn' onClick={() => {
                                                        setIsEditMode(true);
                                                        setOpenRow(null);
                                                        setAddStock({
                                                            DocketNo: "",
                                                            VendorCode: "",
                                                            ForwardNo: "",
                                                            BookDate: new Date(),
                                                        });
                                                        setModalIsOpen(true);
                                                    }}>
                                                        <i className='bi bi-pen'></i>
                                                    </button>
                                                    <button className='edit-btn' onClick={() => {
                                                        setOpenRow(null);
                                                    }}>
                                                        <i className='bi bi-trash'></i></button>
                                                </div>
                                            )}
                                        </td>



                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>




                    <Modal overlayClassName="custom-overlay" isOpen={modalIsOpen}
                        className="custom-modal-volumetric" contentLabel="Modal" style={{
                            content: {
                               height:'auto',
                                whiteSpace: "nowrap"
                            },
                        }}>
                        <div className="custom-modal-content">
                            <div className="header-tittle">
                                <header>Forwarding Master</header>
                            </div>
                            <div className='container2'>
                                <form onSubmit={handleUpdate}>
                                    <div className="fields2">
                                        <div className="input-field">
                                            <label htmlFor="">Booking Date</label>
                                            <DatePicker
                                                portalId="root-portal"
                                                selected={formData.BookDate}
                                                onChange={date => setFormData({ ...formData, BookDate: date })}
                                                dateFormat="dd/MM/yyyy"
                                            />

                                        </div>
                                        
                                        <div className="input-field">
                                            <label htmlFor="">Docket No</label>
                                            <input
                                                placeholder="Docket No"
                                                value={formData.DocketNo}
                                                onChange={e => setFormData({ ...formData, DocketNo: e.target.value })}
                                                required
                                            />

                                        </div>

                                        <div className="input-field">
                                            <label htmlFor="">Vendor Name</label>
                                            <Select
                                                className="blue-selectbooking"
                                                classNamePrefix="blue-selectbooking"
                                                options={getVendor.map(ven => ({
                                                    value: ven.Vendor_Code,   // adjust keys from your API
                                                    label: ven.Vendor_Name
                                                }))}
                                                value={
                                                    formData.VendorCode
                                                        ? { value: formData.VendorCode, label: getVendor.find(ven => ven.Vendor_Code === formData.VendorCode)?.Vendor_Name || '' }
                                                        : null
                                                }
                                                onChange={(selectedOption) => {
                                                    setFormData({
                                                        ...formData,
                                                      VendorCode: selectedOption ? selectedOption.value : ""
                                                    })
                                                }}
                                                placeholder="Select Vendor"
                                                isSearchable
                                                menuPortalTarget={document.body} // ✅ Moves dropdown out of scroll area
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 }) // ✅ Keeps it above other UI
                                                }} />
                                        </div>


                                        <div className="input-field">
                                            <label htmlFor="">Forwarding No</label>
                                            <input
                                                placeholder="Forward No"
                                                value={formData.ForwardNo}
                                                onChange={e => setFormData({ ...formData, ForwardNo: e.target.value })}
                                                required
                                            />
                                        </div>

                                        

                                    </div>

                                    <div className='bottom-buttons'>
                                        <button type='submit' className='ok-btn'>Submit</button>
                                        <button type="button" onClick={() => setModalIsOpen(false)} className='ok-btn'>close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal >
                </div>
            </div>
        </>
    )
}


export default ForwardingInt;