import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getApi } from "../../Admin Master/Area Control/Zonemaster/ServicesApi";
import { useLocation, useNavigate } from "react-router-dom";



function RateCal() {

    const navigate = useNavigate();
    const location = useLocation();


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [formData, setFormData] = useState({
        weight: "",
        country: "",
        zipCode: "",
        doxNon: "",
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleFormChange = (value, key) => {
        setFormData({ ...formData, [key]: value })
    }

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


    return (
        <>

            <div className="body">
                <div className="container1">
                    <form style={{ margin: "0px", padding: "0px", backgroundColor: "#f2f4f3" }} >
                        <div className="fields2" style={{ display: "flex", alignItems: "center" }}>

                             <div className="input-field3">
                                <label>Dox / Non Dox</label>
                                <select name="" id="" value={formData.doxNon}
                                    onChange={(e) => handleFormChange(e.target.value, "doxNon")} >
                                    <option value="Dox">Dox</option>
                                    <option value="Non Dox">Non Dox</option>
                                </select>
                            </div>

                            <div className="input-field3">
                                <label htmlFor="">Weight</label>
                                <input type="text" placeholder="Enter Weight" value={formData.weight} onChange={(e) => handleFormChange(e.target.value, "weight")} />
                            </div>

                            <div className="input-field3">
                                <label htmlFor="">Country</label>
                                <input type="text" placeholder="Enter Country" value={formData.country} onChange={(e) => handleFormChange(e.target.value, "country")} />
                            </div>

                            <div className="input-field3">
                                <label htmlFor="">Zip Code</label>
                                <input type="text" placeholder="Enter Zip Code"
                                    maxLength={9}
                                    pattern="[0-9]{8}"
                                    value={formData.zipCode} onChange={(e) => handleFormChange(e.target.value, "zipCode")} />
                            </div>

                           


                            <div className="bottom-buttons" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                <button className="ok-btn" style={{ height: "35px" }} type="submit">Submit</button>
                            </div>

                        </div>
                    </form>

                    {!loading ? (<div className="loader"></div>) : (
                        <div className='table-container' style={{ margin: "0px" }}>
                            <table className='table table-bordered table-sm' style={{ whiteSpace: "nowrap" }}>
                                <thead className='table-sm'>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Vendor</th>
                                        <th>Shipment</th>
                                        <th>Country</th>
                                        <th>Zone</th>
                                        <th>Lower Wt</th>
                                        <th>Upper Wt</th>
                                        <th>Rate</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRows.map((row, index) => (
                                        <tr key={index} style={{ fontSize: "12px", position: "relative" }}>




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

export default RateCal;