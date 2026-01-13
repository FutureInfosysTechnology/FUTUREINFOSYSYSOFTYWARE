import React, { useState, useEffect } from 'react';
import Header from '../../Components-2/Header/Header';
import Sidebar1 from '../../Components-2/Sidebar1';

import logo from '../../Assets/Images/AceLogo.jpeg';
import 'jspdf-autotable';
import { getApi } from '../Admin Master/Area Control/Zonemaster/ServicesApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import BarCode from "react-barcode";
import { toWords } from "number-to-words";

function LabelPrintingPdf2() {
    const countryList = [
        { name: "Afghanistan", code: "+93" },
        { name: "Albania", code: "+355" },
        { name: "Algeria", code: "+213" },
        { name: "Andorra", code: "+376" },
        { name: "Angola", code: "+244" },
        { name: "Antigua and Barbuda", code: "+1-268" },
        { name: "Argentina", code: "+54" },
        { name: "Armenia", code: "+374" },
        { name: "Australia", code: "+61" },
        { name: "Austria", code: "+43" },
        { name: "Azerbaijan", code: "+994" },

        { name: "Bahamas", code: "+1-242" },
        { name: "Bahrain", code: "+973" },
        { name: "Bangladesh", code: "+880" },
        { name: "Barbados", code: "+1-246" },
        { name: "Belarus", code: "+375" },
        { name: "Belgium", code: "+32" },
        { name: "Belize", code: "+501" },
        { name: "Benin", code: "+229" },
        { name: "Bhutan", code: "+975" },
        { name: "Bolivia", code: "+591" },
        { name: "Bosnia and Herzegovina", code: "+387" },
        { name: "Botswana", code: "+267" },
        { name: "Brazil", code: "+55" },
        { name: "Brunei", code: "+673" },
        { name: "Bulgaria", code: "+359" },
        { name: "Burkina Faso", code: "+226" },
        { name: "Burundi", code: "+257" },

        { name: "Cambodia", code: "+855" },
        { name: "Cameroon", code: "+237" },
        { name: "Canada", code: "+1" },
        { name: "Cape Verde", code: "+238" },
        { name: "Central African Republic", code: "+236" },
        { name: "Chad", code: "+235" },
        { name: "Chile", code: "+56" },
        { name: "China", code: "+86" },
        { name: "Colombia", code: "+57" },
        { name: "Comoros", code: "+269" },
        { name: "Congo", code: "+242" },
        { name: "Costa Rica", code: "+506" },
        { name: "Croatia", code: "+385" },
        { name: "Cuba", code: "+53" },
        { name: "Cyprus", code: "+357" },
        { name: "Czech Republic", code: "+420" },

        { name: "Denmark", code: "+45" },
        { name: "Djibouti", code: "+253" },
        { name: "Dominica", code: "+1-767" },
        { name: "Dominican Republic", code: "+1-809" },

        { name: "Ecuador", code: "+593" },
        { name: "Egypt", code: "+20" },
        { name: "El Salvador", code: "+503" },
        { name: "Equatorial Guinea", code: "+240" },
        { name: "Eritrea", code: "+291" },
        { name: "Estonia", code: "+372" },
        { name: "Eswatini", code: "+268" },
        { name: "Ethiopia", code: "+251" },

        { name: "Fiji", code: "+679" },
        { name: "Finland", code: "+358" },
        { name: "France", code: "+33" },

        { name: "Gabon", code: "+241" },
        { name: "Gambia", code: "+220" },
        { name: "Georgia", code: "+995" },
        { name: "Germany", code: "+49" },
        { name: "Ghana", code: "+233" },
        { name: "Greece", code: "+30" },
        { name: "Grenada", code: "+1-473" },
        { name: "Guatemala", code: "+502" },
        { name: "Guinea", code: "+224" },
        { name: "Guyana", code: "+592" },

        { name: "Haiti", code: "+509" },
        { name: "Honduras", code: "+504" },
        { name: "Hungary", code: "+36" },

        { name: "Iceland", code: "+354" },
        { name: "India", code: "+91" },
        { name: "Indonesia", code: "+62" },
        { name: "Iran", code: "+98" },
        { name: "Iraq", code: "+964" },
        { name: "Ireland", code: "+353" },
        { name: "Israel", code: "+972" },
        { name: "Italy", code: "+39" },

        { name: "Jamaica", code: "+1-876" },
        { name: "Japan", code: "+81" },
        { name: "Jordan", code: "+962" },

        { name: "Kazakhstan", code: "+7" },
        { name: "Kenya", code: "+254" },
        { name: "Kuwait", code: "+965" },
        { name: "Kyrgyzstan", code: "+996" },

        { name: "Laos", code: "+856" },
        { name: "Latvia", code: "+371" },
        { name: "Lebanon", code: "+961" },
        { name: "Liberia", code: "+231" },
        { name: "Libya", code: "+218" },
        { name: "Lithuania", code: "+370" },
        { name: "Luxembourg", code: "+352" },

        { name: "Malaysia", code: "+60" },
        { name: "Maldives", code: "+960" },
        { name: "Mexico", code: "+52" },
        { name: "Mongolia", code: "+976" },
        { name: "Morocco", code: "+212" },

        { name: "Nepal", code: "+977" },
        { name: "Netherlands", code: "+31" },
        { name: "New Zealand", code: "+64" },
        { name: "Nigeria", code: "+234" },
        { name: "Norway", code: "+47" },

        { name: "Oman", code: "+968" },

        { name: "Pakistan", code: "+92" },
        { name: "Philippines", code: "+63" },
        { name: "Poland", code: "+48" },
        { name: "Portugal", code: "+351" },

        { name: "Qatar", code: "+974" },

        { name: "Romania", code: "+40" },
        { name: "Russia", code: "+7" },

        { name: "Saudi Arabia", code: "+966" },
        { name: "Singapore", code: "+65" },
        { name: "South Africa", code: "+27" },
        { name: "South Korea", code: "+82" },
        { name: "Spain", code: "+34" },
        { name: "Sri Lanka", code: "+94" },
        { name: "Sweden", code: "+46" },
        { name: "Switzerland", code: "+41" },

        { name: "Thailand", code: "+66" },
        { name: "Turkey", code: "+90" },

        { name: "Ukraine", code: "+380" },
        { name: "United Arab Emirates", code: "+971" },
        { name: "United Kingdom", code: "+44" },
        { name: "United States", code: "+1" },

        { name: "Vietnam", code: "+84" },

        { name: "Yemen", code: "+967" },
        { name: "Zambia", code: "+260" },
        { name: "Zimbabwe", code: "+263" }
    ];

    function getCountryCode(countryName) {
        const country = countryList.find(
            c => c.name.toLowerCase() === countryName?.toLowerCase()
        );
        return country ? country.code : null;
    }

    const [getBranch, setGetBranch] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    console.log(location.state);
    const fromPath = location?.state?.path || "/";
    const tab = location?.state?.tab;
    const [data, setData] = useState([]);
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await getApi(`/Master/getBranch?Branch_Code=${data[0]?.Branch_Code}`);
        //         if (response.status === 1) {
        //             console.log(response.Data);
        //             setGetBranch(response.Data[0]);
        //         }
        //     }
        //     catch (error) {
        //         console.log(error);
        //     }
        // }
        setData(location?.state?.data || []);
        setGetBranch(location?.state?.BranchDetails || []);
        // fetchData();
    }, [])
    function numberToIndianCurrency(num) {
        if (!num || isNaN(num)) return "";

        const [rupees, paise] = num.toFixed(2).split(".");

        let result = toWords(Number(rupees))
            .replace(/\b\w/g, (txt) => txt.toUpperCase()) + " Rupees";

        if (Number(paise) > 0) {
            result += " and " + toWords(Number(paise))
                .replace(/\b\w/g, (txt) => txt.toUpperCase()) + " Paise";
        }

        return result + " Only";
    }
    const formateDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return ""; // invalid date
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };
    const handleDownloadPDF = async () => {
        // Select all container elements (each label)
        const containerElements = document.querySelectorAll(".download");

        if (containerElements.length === 0) return;

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

        for (let i = 0; i < containerElements.length; i++) {
            const element = containerElements[i];

            // Capture one container as a high-quality image
            const canvas = await html2canvas(element, {
                scale: 6,
                useCORS: true,
                backgroundColor: "#ffffff",
                scrollY: -window.scrollY,
                windowWidth: document.documentElement.scrollWidth,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.95);

            // Convert px to mm
            const pxToMm = (px) => (px * 25.4) / 96;
            const imgWidthMm = pxToMm(canvas.width);
            const imgHeightMm = pxToMm(canvas.height);
            const imgRatio = imgWidthMm / imgHeightMm;

            // Fit to A4 page with small margins
            let renderWidth = pdfWidth - 10; // 5mm margin each side
            let renderHeight = renderWidth / imgRatio;

            if (renderHeight > pdfHeight - 10) {
                renderHeight = pdfHeight - 10;
                renderWidth = renderHeight * imgRatio;
            }

            const xOffset = (pdfWidth - renderWidth) / 2;
            const yOffset = (pdfHeight - renderHeight) / 2;

            pdf.addImage(imgData, "JPEG", xOffset, yOffset, renderWidth, renderHeight);

            // Add new page except after the last one
            if (i < containerElements.length - 1) pdf.addPage();
        }

        pdf.save("LabelPrint2.pdf");
    };


    return (
        <>
            <style>
                {`
@media print {

  body * {
    visibility: hidden;
  }


  #pdf, #pdf * {
    visibility: visible;
  }

  #pdf {
    position: absolute;
    top: 0;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
  }

  .download {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
    @page:first {
    size: A4 portrait;
    margin: 0in; /* removes browser default margins */
  }  
}

`}
            </style>



            <Header />
            <Sidebar1 />
            {loading && <div style={{ fontSize: "30px", color: "black" }}>Loading...</div>}
            {data?.length > 0 && (
                <div className="main-body" id="main-body">
                    <div className="container py-0">
                        <div className="container-2 py-1" style={{ borderRadius: "0px", width: "500px", gap: "5px", border: "none" }}>
                            <div className="container-2" style={{ borderRadius: "0px", width: "500px", display: "flex", flexDirection: "row", border: "none", justifyContent: "end", gap: "10px", fontSize: "12px" }}>
                                <button
                                    onClick={handleDownloadPDF}
                                    style={{ padding: "5px 5px", borderRadius: "6px", background: "green", color: "white", border: "none", cursor: "pointer" }}
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    style={{ padding: "5px 10px", borderRadius: "6px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                                >
                                    Print
                                </button>
                                <button
                                    onClick={() => navigate(fromPath, { state: { tab: tab } })}
                                    style={{ padding: "5px 10px", borderRadius: "6px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                        <div className="container-2" id='pdf' style={{ borderRadius: "0px", paddingLeft: "20px", fontFamily: '"Times New Roman", Times, serif', paddingRight: "20px", paddingTop: "20px", paddingBottom: "20px", width: "500px", direction: "flex", flexDirection: "column", gap: "5px" }}>
                            {
                                data.map((docket, index) =>
                                (
                                    <div className="docket" key={index} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                        {
                                            Array.from({ length: docket.Qty }, (_, i) => (
                                                <div className='download'>
                                                    <div className="container" style={{ border: "1px solid black", padding: "0px", width: "450px", display: "flex", flexDirection: "column" }}>
                                                        <div style={{ display: "flex", width: "100%", padding: "10px", justifyContent: "center" }}>
                                                            <img src={getBranch[0]?.Branch_Logo} style={{ width: "70%", height: "120px" }} />
                                                        </div>
                                                        <div style={{ display: "flex", width: "100%", padding: "10px", justifyContent: "space-between", color: "gray" }}>
                                                            <div style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}>Deliver To</div>
                                                            <div>www.aslogisticsexpress.com</div>
                                                            <div>{docket?.Customer_Code}</div>
                                                        </div>
                                                        <div style={{ display: "flex", width: "100%", padding: "10px", justifyContent: "space-between", color: "gray" }}>
                                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", fontSize: "12px", gap: "20px" }}>
                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                    <div>{docket?.Consignee_Name}</div>
                                                                    <div>{docket?.Consignee_Add1},{docket?.Consignee_Add2}</div>
                                                                    <div>{docket?.Consignee_Country}-{docket?.Consignee_State}-{docket?.Consignee_Pin}</div>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                    <div>{docket?.Consignee_Mob ? `(${getCountryCode(docket?.Destination_Name)})` : ""} {docket?.Consignee_Mob}</div>
                                                                    <div>{docket?.Consignee_Email}</div>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid black", width: "30%", alignItems: "end", gap: "10px" }}>
                                                                <div style={{ fontSize: "18px", color: "black", fontWeight: "bold", textAlign: "center" }}>{docket?.Destination_Name}</div>
                                                                <div style={{ color: "black" }}>{docket?.BookDate}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black", display: "flex", width: "100%" }}>

                                                            <div
                                                                className="p-2 pb-0"
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "space-between",
                                                                    gap: "10px",
                                                                    width: "50%",
                                                                    borderRight: "1px solid black",
                                                                    lineHeight: "1.1", // 🔹 reduce line spacing

                                                                }}
                                                            >
                                                                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "15px" }}>
                                                                    <div style={{ border: "3px dashed black" }}></div>
                                                                    <div style={{ fontWeight: "bold" }}>{docket?.Vendor_Name}</div>
                                                                    <div style={{ border: "3px dashed black" }}></div>

                                                                </div>
                                                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>TRACKING NUMBER</div>
                                                                    <BarCode
                                                                        value={docket?.DocketNo}
                                                                        format='CODE128'
                                                                        background='#fff'
                                                                        lineColor='#000'
                                                                        width={1.5}
                                                                        height={60}
                                                                        displayValue={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="p-2 pb-1"
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "10px",
                                                                    width: "50%",
                                                                    lineHeight: "1.1", // 🔹 reduce line spacing

                                                                }}
                                                            >
                                                                <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: "30px" }}>{i + 1} of {docket?.Qty}</div>
                                                                <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold", flexDirection: "column", alignItems: "center", fontSize: "15px" }}>
                                                                    <div>{docket?.VolumetriceData?.reduce((sum, item) => sum + (item.ChargeWt || 0), 0)} KG</div>
                                                                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", gap: "2px" }}>
                                                                        {
                                                                            docket?.VolumetriceData?.map((v) => (
                                                                                <div style={{ fontSize: "10px" }}>{v?.Length} X {v?.Width} X {v?.Height} CM = {v?.ChargeWt} KG</div>
                                                                            ))
                                                                        }
                                                                    </div>

                                                                </div>
                                                                <div style={{ fontSize: "12px" }}> <span style={{ fontWeight: "bold" }}>Content :</span>
                                                                    {
                                                                        docket?.PrformaDetails?.map((v) => (
                                                                            <span>{v?.Description} ,</span>
                                                                        ))
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", width: "100%" }}>

                                                            <div
                                                                className="p-2 pb-1"
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "space-between",
                                                                    gap: "10px",
                                                                    width: "50%",
                                                                    borderRight: "1px solid black",
                                                                    lineHeight: "1.1", // 🔹 reduce line spacing

                                                                }}
                                                            >
                                                                <div style={{ width: "100%", display: "flex", flexDirection: "column", fontSize: "10px" }}>

                                                                    <div style={{ fontWeight: "bold", fontSize: "20px" }}>Shipper :-</div>
                                                                    <div style={{ marginTop: "10px" }}>{docket?.Shipper_Name}</div>
                                                                    <div >{docket?.ShipperAdd},{docket?.ShipperAdd2}</div>
                                                                    <div>{docket?.ShipperAdd3} - {docket?.Shipper_State_Name}</div>
                                                                    <div style={{ marginTop: "10px" }}>(+91) {docket?.ShipperPhone}</div>
                                                                    <div>{docket?.ShipperEmail}</div>


                                                                </div>
                                                            </div>
                                                            <div
                                                                className="p-2"
                                                                style={{

                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: "50%",
                                                                    padding: "20px",
                                                                    minHeight: "160px",
                                                                    lineHeight: "1.1", // 🔹 reduce line spacing

                                                                }}
                                                            >
                                                                <div style={{
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    fontSize: "10px",
                                                                    alignItems: "center",
                                                                    padding: "10px",
                                                                    transform: "rotate(90deg)",   // ROTATION HERE
                                                                    transformOrigin: "center"     // keeps it centered
                                                                }}>
                                                                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>PARCEL NUMBER</div>

                                                                    <div
                                                                        style={{
                                                                            width: "180px",      // 🔒 fixed width
                                                                            height: "100px",      // 🔒 fixed height
                                                                            overflow: "hidden",  // 🔒 prevent expansion
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <BarCode
                                                                            value={docket?.VendorAwbNo}
                                                                            format='CODE128'
                                                                            background='#fff'
                                                                            lineColor='#000'
                                                                            width={1.5}
                                                                            height={60}
                                                                        />
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default LabelPrintingPdf2;