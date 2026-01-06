import { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getApi } from "../../Admin Master/Area Control/Zonemaster/ServicesApi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";



function Performa() {
    const navigate = useNavigate();
    const location = useLocation();


    const [invoice, setInvoice] = useState([])
    const [openRow, setOpenRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const handleFormChange = (value, key) => {
        setFormData({ ...formData, [key]: value })
    }
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = invoice.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(invoice.length / rowsPerPage);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [formData, setFormData] = useState({
        fromDate: firstDayOfMonth,
        toDate: today,
        docketNo: "",
    });
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const queryParams = {
                DocketNo: formData.docketNo || "",
                FromDate: formData.fromDate
                    ? formData.fromDate.toISOString().split("T")[0]
                    : "",
                ToDate: formData.toDate
                    ? formData.toDate.toISOString().split("T")[0]
                    : "",
            };

            const response = await getApi(
                `/Booking/GetPrfmaBooking?FromDate=${queryParams.FromDate}&ToDate=${queryParams.ToDate}&DocketNo=${queryParams.DocketNo}`
            );

            if (response?.status === 1) {
                setInvoice(response.data);
            } else {
                setInvoice([]);
                Swal.fire("Info", response?.message || "No data found", "info");
            }

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch proforma booking", "error");
        }
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your zone has been deleted.',
                    'success'
                );
            }
        });
    };


    /**************** function to export table data in excel and pdf ************/
    // Handle changing page
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handleOpenInvoicePrint = (docNo) => {
        navigate("/performainvoice", { state: { DocketNo: docNo, from: location.pathname, tab: "viewPerformance" } })
    };
    const handleOpenInvoicePrint2 = async (docNo) => {
        try {
            const response = await getApi(`/Booking/DocketPrint_2?FromDocket=${docNo}&ToDocket=${docNo}`);
            if (response.status === 1) {
                console.log(response);
                console.log(response.Data);
                response.Data && navigate("/labelprint2", { state: { data: response.Data, BranchDetails:response.BranchDetails,path: location.pathname, tab: "viewPerformance" } });
            }
            else {
                Swal.fire("Warning", `Warong Docket Number`, "warning");
            }
        }
        catch (error) {
            console.error("API Error:", error);
        }
        finally {
        }
    };

    return (
        <>

            <div className="body">
                <div className="container1">
                    <form style={{ margin: "0px", padding: "0px", backgroundColor: "#f2f4f3" }} onSubmit={handleSubmit}>
                        <div className="fields2" style={{ display: "flex", alignItems: "center" }}>
                            <div className="input-field3">
                                <label htmlFor="">Docket No</label>
                                <input type="text" placeholder="Docket No" value={formData.docketNoNo} onChange={(e) => handleFormChange(e.target.value, "docketNo")} />
                            </div>
                            <div className="input-field3">
                                <label htmlFor="">From Date</label>
                                <DatePicker
                                    portalId="root-portal"
                                    selected={formData.fromDate}
                                    onChange={(date) => handleFormChange(date, "fromDate")}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control form-control-sm"
                                />
                            </div>

                            <div className="input-field3">
                                <label htmlFor="">To Date</label>
                                <DatePicker
                                    portalId="root-portal"
                                    selected={formData.toDate}
                                    onChange={(date) => handleFormChange(date, "toDate")}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control form-control-sm"
                                />
                            </div>
                            <div className="bottom-buttons" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                <button className="ok-btn" style={{ height: "35px" }} type="submit">Submit</button>
                            </div>

                            <div style={{ display: "flex", flex: "1", justifyContent: "end", marginTop: "10px" }}>
                                <div className="search-input mt-2">
                                    <input style={{}} className="add-input" type="text" placeholder="search" />
                                    <button type="submit" title="search">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </form>

                    {loading ? (<div className="loader"></div>) : (
                        <div className='table-container' style={{ margin: "0px" }}>
                            <table className='table table-bordered table-sm' style={{ whiteSpace: "nowrap" }}>
                                <thead className='table-sm'>
                                    <tr>
                                        <th>Actions</th>
                                        <th>Sr.No</th>
                                        <th>Docket No</th>
                                        <th>Booking Date</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                        <th>Mode</th>
                                        <th>Shipper Name</th>
                                        <th>Consignee Name</th>
                                        <th>Label</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRows.map((row, index) => (
                                        <tr key={index} style={{ fontSize: "12px", position: "relative" }}>
                                            <td><PiDotsThreeOutlineVerticalFill
                                                style={{ fontSize: "20px", cursor: "pointer" }}
                                                onClick={() =>
                                                    setOpenRow(openRow === index ? null : index) // toggle only this row
                                                }
                                            />

                                                {openRow === index && (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            flexDirection: "row",
                                                            position: "absolute",
                                                            alignItems: "center",
                                                            left: "70px",
                                                            top: "0px",
                                                            borderRadius: "10px",
                                                            backgroundColor: "white",
                                                            zIndex: "999999",
                                                            height: "30px",
                                                            width: "50px",
                                                            padding: "10px"
                                                        }}
                                                    >
                                                        <button className='edit-btn' onClick={() => handleOpenInvoicePrint(row.DocketNo)}>
                                                            <i className='bi bi-file-earmark-pdf-fill' style={{ fontSize: "18px" }}></i>
                                                        </button>
                                                        <button onClick={() => handleDelete(index)} className='edit-btn'>
                                                            <i className='bi bi-trash' style={{ fontSize: "18px" }}></i>
                                                        </button>
                                                    </div>
                                                )}</td>
                                            <td>{index + 1}</td>

                                            {/* Correct fields */}
                                            <td>{row?.DocketNo}</td>
                                            <td>{formatDate(row.BookDate)}</td>
                                            <td>{row?.OriginCity}</td>
                                            <td>{row?.DestinationCity}</td>
                                            <td>{row?.Mode_Name}</td>
                                            <td>{row?.Shipper_Name}</td>
                                            <td>{row?.Consignee_Name}</td>
                                            <td>
                                                <button className='edit-btn' onClick={() => handleOpenInvoicePrint2(row.DocketNo)}>
                                                    <i className='bi bi-file-earmark-pdf-fill' style={{ fontSize: "18px" }}></i>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div >)
                    }

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className="pagination">
                            <button className="ok-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>{"<"}</button>
                            <span style={{ color: "#333", padding: "5px" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button className="ok-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>{">"}</button>
                        </div>

                        <div className="rows-per-page" style={{ display: "flex", flexDirection: "row", color: "black", marginLeft: "10px" }}>
                            <label style={{ marginTop: "16px", marginRight: "10px" }}>Rows per page:</label>
                            <select style={{ height: "40px", width: "60px", marginTop: "10px" }} value={rowsPerPage} onChange={handleRowsPerPageChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>
                            </select>
                        </div>
                    </div>
                </div >
            </div >

        </>
    );
};

export default Performa;