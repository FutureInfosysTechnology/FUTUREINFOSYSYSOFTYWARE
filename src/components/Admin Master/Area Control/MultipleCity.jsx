import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Modal from 'react-modal';
import Select from "react-select";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import '../../Tabs/tabs.css';
import { deleteApi, getApi, postApi, putApi } from "./Zonemaster/ServicesApi";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown } from 'bootstrap';


function MultipleCity() {
    const [openRow, setOpenRow] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [multipleCity, setmultipleCity] = useState([]);
    const [getMode, setGetMode] = useState([]);                       // To Get Mode Data
    const [getCity, setGetCity] = useState([]);                       // To Get City Data
    const [getZone, setGetZone] = useState([]);                       // To Get Zone Data
    const [getState, setGetState] = useState([]);                     // To Get State Data
    const [getVendor, setGetVendor] = useState([]);                   // To Get Vendor Data
    const [getCountry, setGetCountry] = useState([]);                 // To Get Country Data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [drop, setDrop] = useState("V");
    const [addCity, setAddCity] = useState({
        ID: '',
        VendorCode: '',
        ModeCode: '',
        ZoneCode: '',
        CountryCode: '',
        StateCode: '',
        CityCode: '',
        ProductType: '',
        OriginCode: 'IN',
        PostalCode: ''          // ✅ ADDED
    });


    const handleSearch = async () => {

    try {
        let query = `/Master/GetAllInternatioanlzone?pageNumber=${currentPage}&pageSize=${rowsPerPage}`;

        if (drop === "V") {
            query += `&Vendor_Name=${searchQuery}`;
        } 
        else if (drop === "C") {
            query += `&Country_Name=${searchQuery}`;
        } 
        else if (drop === "D") {
            query += `&City_Name=${searchQuery}`;
        } 
        else if (drop === "P") {
            query += `&PostalCode=${searchQuery}`;
        }

        const response = await getApi(query);

        setmultipleCity(Array.isArray(response.data) ? response.data : []);
        setTotalPages(Math.ceil(response.totalRecords / rowsPerPage));
    } catch (err) {
        console.error("Fetch Error:", err);
        setError(err);
    } 
};


   
    useEffect(() => {
        handleSearch();
    }, [rowsPerPage, currentPage,searchQuery,drop]);

    const fetchData = async (endpoint, setData) => {
        try {
            const response = await getApi(endpoint);
            setData(Array.isArray(response.Data) ? response.Data : []);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData('/Master/getCountry', setGetCountry);
        fetchData('/Master/GetState', setGetState);
        fetchData('/Master/getVendor', setGetVendor);
        fetchData('/Master/getMode', setGetMode);
        fetchData('/Master/getZone', setGetZone);
    }, []);

    useEffect(() => {
        const fetchData = async (setData, Product_Type) => {


            try {
                const response = await getApi(`/Master/GetInterDomestic?Product_Type=${Product_Type}`);
                const data = response.Data || response.data
                // Check if the response contains data, then update the corresponding state
                if (data) {
                    setData(Array.isArray(data) ? data : []);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.error(`Error fetching data from /Master/GetInterDomestic:`, err);

            }

        };
        const Product_Type = addCity.ProductType ? addCity.ProductType : "International";
        fetchData(setGetCity, Product_Type);
    }, [addCity.ProductType])

    const handleUpdate = async (e) => {
        e.preventDefault();

        const requestBody = {
            ID: addCity.ID,
            VendorCode: addCity.VendorCode,
            ModeCode: addCity.ModeCode,
            ZoneCode: addCity.ZoneCode,
            CountryCode: addCity.CountryCode,
            StateCode: addCity.StateCode,
            CityCode: addCity.CityCode,
            ProductType: addCity.ProductType,
            Origin_Code: addCity.OriginCode,
            PostalCode: addCity.PostalCode      // ✅ ADDED
        }

        try {
            const response = await putApi('/Master/UpdateInternatioanlzone', requestBody);
            if (response.status === 1) {
                setAddCity({
                    ID: '',
                    VendorCode: '',
                    ModeCode: '',
                    ZoneCode: '',
                    CountryCode: '',
                    StateCode: '',
                    CityCode: '',
                    ProductType: '',
                    OriginCode: 'IN',
                });
                Swal.fire('Updated!', response.message || 'Zone has been updated.', 'success');
                setModalIsOpen(false);
                await handleSearch();
            } else {
                Swal.fire('Error!', response.message || 'Failed to update the zone.', 'error');
            }
        } catch (error) {
            console.error("Failed to update Multiple City:", error);
            Swal.fire('Error', 'Failed to update zone data', 'error');
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const payload = {
            VendorCode: addCity.VendorCode,
            ModeCode: addCity.ModeCode,
            ZoneCode: addCity.ZoneCode,
            CountryCode: addCity.CountryCode,
            StateCode: addCity.StateCode,
            CityCode: addCity.CityCode,
            ProductType: addCity.ProductType,
            Origin_Code: addCity.OriginCode,
            PostalCode: addCity.PostalCode
        }

        try {
            const response = await postApi(`/Master/AddInternatioanlzone`, payload);
            if (response.status === 1) {
                setAddCity({
                    ID: '',
                    VendorCode: '',
                    ModeCode: '',
                    ZoneCode: '',
                    CountryCode: '',
                    StateCode: '',
                    CityCode: '',
                    ProductType: '',
                    OriginCode: 'IN',
                });
                Swal.fire('Saved!', response.message || 'Zone has been saved.', 'success');
                setModalIsOpen(false);
                await handleSearch();
            } else {
                Swal.fire('Error!', response.message || 'Failed to save zone.', 'error');

            }
        } catch (err) {
            console.error('Save Error:', err);
            Swal.fire('Error', 'Failed to Save zone Data', 'error');
        }
    };


    const handleDelete = async (ID) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const response = await deleteApi(
                        `/Master/DeleteInternatioanlzone?ID=${ID}`
                    );

                    if (response.status === 1) {
                        Swal.fire('Deleted!', 'Zone deleted successfully.', 'success');
                        setmultipleCity(multipleCity.filter(c => c.ID !== ID));

                    }
                    else if (response.data.status === 0) {
                        Swal.fire('Not Found', 'Record not found.', 'warning');
                    }
                    else {
                        Swal.fire('Error', 'Something went wrong.', 'error');
                    }

                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };
    const handleSearchChange = (e) => { setSearchQuery(e.target.value);setCurrentPage(1) };

    const handleExportExcel = () => {

        // Create custom export rows in same order as table
        const exportData = multipleCity.map((row, index) => ({
            "Mode Name": row.Mode_Name,
            "Zone Name": row.Zone_Name,
            "Country Name": row.Country_Name,
            "State Name": row.State_Name,
            "City Name": row.City_Name,
            "Vendor Name": row.Vendor_Name,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'International Zone');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const file = new Blob(
            [excelBuffer],
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
        );

        saveAs(file, 'internationalZone.xlsx');
    };


    const handleExportzonePDF = () => {
        const pdf = new jsPDF();

        pdf.setFontSize(18);
        pdf.text('International Zone Data', 14, 20);

        const headers = [['index', 'Vendor Name', 'Mode', 'Zone', 'Country', 'State', 'City']];

        // Prepare table rows exactly like your table columns
        const pdfData = multipleCity.map((item, index) => [
            index + 1,           // Sr.No
            item.Vendor_Name,
            item.Mode_Name,
            item.Zone_Name,
            item.Country_Name,
            item.State_Name,
            item.City_Name,
        ]);

        autoTable(pdf,
            {
                head: headers,
                body: pdfData,
                startY: 30,
                theme: 'grid'
            });

        pdf.save('internationalZone.pdf');
    };





    const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="body">
            <div className="container1">
                <div className="addNew row align-items-center g-2">

                    {/* LEFT SECTION — ADD NEW + Export */}

                    <div className="col-md-4 col-sm-6 d-flex align-items-center gap-2" >

                        <button
                            style={{ width: "100px" }}
                            className="add-btn"
                            onClick={() => {
                                setModalIsOpen(true);
                                setIsEditMode(false);
                                setAddCity({
                                    ID: '',
                                    VendorCode: '',
                                    ModeCode: '',
                                    ZoneCode: '',
                                    CountryCode: '',
                                    StateCode: '',
                                    CityCode: '',
                                    ProductType: '',
                                    OriginCode: 'IN',
                                });
                            }}
                        >
                            + ADD NEW
                        </button>

                        <div className="dropdown">
                            <button className="dropbtn">
                                <i className="bi bi-file-earmark-arrow-down"></i> Export
                            </button>
                            <div className="dropdown-content">
                                <button onClick={handleExportExcel}>Export to Excel</button>
                                <button onClick={handleExportzonePDF}>Export to PDF</button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SECTION — Search */}
                    <div className="col-12 col-md-4 col-sm-6 row g-2" >

                        <div className="col-12 col-md-4 col-sm-4">
                            <select className="" value={drop} onChange={(e)=>setDrop(e.target.value)}>
                                <option value="V">Vendor</option>
                                <option value="C">Country</option>
                                <option value="D">City</option>
                                <option value="P">Postal</option>
                            </select>
                        </div>

                        {/* Input */}
                        <div className="col-12 col-md-8 col-sm-8" style={{ position: "relative" }}>
                            <input
                                style={{ background: "#ececec", borderRadius: "20px" }}
                                className="add-input form-control w-100"
                                type="text"
                                placeholder="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div style={{ position: "absolute", top: "7%", right: "15px" }}>
                                <IoSearchOutline style={{ color: " #4FD1C5" }} />
                            </div>
                        </div>
                    </div>

                </div>



                <div className='table-container'>
                    <table className='table table-bordered table-sm' style={{ whiteSpace: "nowrap" }}>
                        <thead className='table-sm'>
                            <tr>
                                <th scope="col">Actions</th>
                                <th scope="col">Sr.No</th>
                                <th scope="col">Mode name</th>
                                <th scope="col">Zone Name</th>
                                <th scope="col">Country Name</th>
                                <th scope="col">State Name</th>
                                <th scope="col">Postal Code</th>
                                <th scope="col">City Name</th>
                                <th scope="col">Vendor Name</th>

                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {multipleCity.map((multiple, index) => (
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
                                                    left: "90px",
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
                                                    setAddCity({
                                                        ID: multiple.ID,
                                                        ModeCode: multiple.Mode_Code,
                                                        ZoneCode: multiple.Zone_Code,
                                                        CountryCode: multiple.Country_Code,
                                                        StateCode: multiple.State_Code,
                                                        CityCode: multiple.City_Code,
                                                        ProductType: multiple.ProductType,
                                                        VendorCode: multiple.Vendor_Code,
                                                        OriginCode: multiple.Origin_Code,
                                                        PostalCode: multiple.PostalCode,
                                                    });
                                                    setModalIsOpen(true);
                                                }}>
                                                    <i className='bi bi-pen'></i>
                                                </button>
                                                <button onClick={() => {
                                                    setOpenRow(null);
                                                    handleDelete(multiple.ID);
                                                }} className='edit-btn'><i className='bi bi-trash'></i></button>
                                            </div>
                                        )}
                                    </td>

                                    <td>{index + 1}</td>
                                    <td>{multiple.Mode_Name}</td>
                                    <td>{multiple.Zone_Name}</td>
                                    <td>{multiple.Country_Name}</td>
                                    <td>{multiple.State_Name}</td>
                                    <td>{multiple.PostalCode}</td>
                                    <td>{multiple.City_Name}</td>
                                    <td>{multiple.Vendor_Name}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="row" style={{ whiteSpace: "nowrap" }}>
                    <div className="pagination col-12 col-md-6 d-flex justify-content-center align-items-center mb-2 mb-md-0">
                        <button className="ok-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            {'<'}
                        </button>
                        <span style={{ color: "#333", padding: "5px" }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button className="ok-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            {'>'}
                        </button>
                    </div>

                    <div className="rows-per-page col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center">
                        <label htmlFor="rowsPerPage" className="me-2">Rows per page: </label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            style={{ height: "40px", width: "50px" }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                <Modal overlayClassName="custom-overlay" isOpen={modalIsOpen}
                    className="custom-modal-volumetric" contentLabel="Modal">
                    <div className="custom-modal-content">
                        <div className="header-tittle">
                            <header>International Zone Master</header>
                        </div>

                        <div className='container2'>
                            <form onSubmit={handleSave}>
                                <div className="fields2" style={{ whiteSpace: "nowrap" }}>

                                    {/* Product Type */}
                                    <div className="input-field1">
                                        <label>Product Type</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={[
                                                { value: "International", label: "International" },
                                                { value: "Domestic", label: "Domestic" },
                                            ]}
                                            value={
                                                addCity.ProductType
                                                    ? {
                                                        value: addCity.ProductType,
                                                        label: addCity.ProductType,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    ProductType: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Product Type"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    <div className="input-field1">
                                        <label>Origin Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getCity.map(city => ({
                                                value: city.City_Code,
                                                label: city.City_Name,
                                            }))}
                                            value={
                                                addCity.OriginCode
                                                    ? {
                                                        value: addCity.OriginCode,
                                                        label: getCity.find(c => c.City_Code === addCity.OriginCode)?.City_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    OriginCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Origin Name"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* City Name */}
                                    <div className="input-field1">
                                        <label>City Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getCity.map(city => ({
                                                value: city.City_Code,
                                                label: city.City_Name,
                                            }))}
                                            value={
                                                addCity.CityCode
                                                    ? {
                                                        value: addCity.CityCode,
                                                        label: getCity.find(c => c.City_Code === addCity.CityCode)?.City_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    CityCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select City Name"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* Zone Name */}
                                    <div className="input-field1">
                                        <label>Zone Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getZone.map(zone => ({
                                                value: zone.Zone_Code,
                                                label: zone.Zone_Name,
                                            }))}
                                            value={
                                                addCity.ZoneCode
                                                    ? {
                                                        value: addCity.ZoneCode,
                                                        label: getZone.find(z => z.Zone_Code === addCity.ZoneCode)?.Zone_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    ZoneCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Zone"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* Postal Code */}
                                    <div className="input-field1">
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            value={addCity.PostalCode}
                                            onChange={(e) =>
                                                setAddCity({
                                                    ...addCity,
                                                    PostalCode: e.target.value
                                                })
                                            }
                                            placeholder="Enter Postal Code"
                                        />
                                    </div>


                                    {/* Mode Name */}
                                    <div className="input-field1">
                                        <label>Mode Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getMode.map(mode => ({
                                                value: mode.Mode_Code,
                                                label: mode.Mode_Name,
                                            }))}
                                            value={
                                                addCity.ModeCode
                                                    ? {
                                                        value: addCity.ModeCode,
                                                        label: getMode.find(m => m.Mode_Code === addCity.ModeCode)?.Mode_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    ModeCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Mode"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* State Name */}
                                    <div className="input-field1">
                                        <label>State Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getState.map(state => ({
                                                value: state.State_Code,
                                                label: state.State_Name,
                                            }))}
                                            value={
                                                addCity.StateCode
                                                    ? {
                                                        value: addCity.StateCode,
                                                        label: getState.find(s => s.State_Code === addCity.StateCode)?.State_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    StateCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select State"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* Vendor Name */}
                                    <div className="input-field1">
                                        <label>Vendor Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getVendor.map(vendor => ({
                                                value: vendor.Vendor_Code,
                                                label: vendor.Vendor_Name,
                                            }))}
                                            value={
                                                addCity.VendorCode
                                                    ? {
                                                        value: addCity.VendorCode,
                                                        label: getVendor.find(v => v.Vendor_Code === addCity.VendorCode)?.Vendor_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    VendorCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Vendor"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>

                                    {/* Country Name */}
                                    <div className="input-field1">
                                        <label>Country Name</label>
                                        <Select
                                            className="blue-selectbooking"
                                            classNamePrefix="blue-selectbooking"
                                            options={getCountry.map(country => ({
                                                value: country.Country_Code,
                                                label: country.Country_Name,
                                            }))}
                                            value={
                                                addCity.CountryCode
                                                    ? {
                                                        value: addCity.CountryCode,
                                                        label: getCountry.find(c => c.Country_Code === addCity.CountryCode)?.Country_Name,
                                                    }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setAddCity({
                                                    ...addCity,
                                                    CountryCode: selected ? selected.value : "",
                                                })
                                            }
                                            placeholder="Select Country"
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>


                                </div>

                                <div className='bottom-buttons'>
                                    {!isEditMode && (<button type='submit' className='ok-btn'>Submit</button>)}
                                    {isEditMode && (<button type='button' onClick={handleUpdate} className='ok-btn'>Update</button>)}
                                    <button onClick={() => setModalIsOpen(false)} className='ok-btn'>close</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Modal >

            </div>
        </div>
    )
}


export default MultipleCity;