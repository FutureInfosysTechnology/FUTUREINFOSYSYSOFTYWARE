import React, { useRef, useState, useEffect } from 'react';
import logoimg from '../../Assets/Images/AceLogo.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import 'jspdf-autotable';
import { getApi } from '../Admin Master/Area Control/Zonemaster/ServicesApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from '../../Components-2/Header/Header';
import Sidebar1 from '../../Components-2/Sidebar1';
import { toWords } from "number-to-words";
import bgImage from '../../Assets/Images/future.png';

function PerformaPdf() {

    const location = useLocation();
    const navigate = useNavigate();
    const DocketNo = location?.state?.DocketNo || "";
    const fromPath = location?.state?.from || "/";
    const tab = location?.state?.tab || "viewPerformance";
    const [getBranch, setGetBranch] = useState([]);
    const [invoiceData, setGetInvoiceData] = useState({});
    const [getItem, setGetItem] = useState([]);
    console.log(location.state);
    const [loading, setLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    console.log(DocketNo);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApi(`/Master/getBranch?Branch_Code=${JSON.parse(localStorage.getItem("Login"))?.Branch_Code}`);
                if (response.status === 1) {
                    console.log(response.Data);
                    setGetBranch(response.Data[0]);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    const pageRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApi(`/Booking/GetPrfmaOrderBkngByDocket?DocketNo=${DocketNo}`);
                setGetInvoiceData(response.data || {});
                setGetItem(response?.data?.Items);
                console.log(response?.data?.Items);
            } catch (err) {
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false);
                setIsDataLoaded(true);
                // generatePDF();
            }
        };
        if (DocketNo) {
            fetchData();
        }
    }, [DocketNo]);
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
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        if (Array.isArray(getItem)) {
            let total = getItem.reduce((sum, item) => sum + (item.Amount || 0), 0);
            setTotalAmount(total);
        }
    }, [getItem]); // 

    const generatePDF = async () => {
        if (!pageRef.current) return;

        // 1️⃣ Capture screenshot
        const canvas = await html2canvas(pageRef.current, {
            scale: 10, // reduce scale slightly (2 → 1.5)
            useCORS: true,
            logging: false,
        });

        // 2️⃣ Convert to compressed JPEG (not PNG)
        const imgData = canvas.toDataURL("image/jpeg", 0.6); // quality: 0.6–0.8 recommended

        // 3️⃣ Create A4 PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // 4️⃣ Add compressed image
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        // 5️⃣ Save
        pdf.save(`Performa_${DocketNo}.pdf`);
    };


    // if (loading) return <p>Loading...</p>;

    return (
        <>
            <style>
                {`
 @media print {
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  #pdf {
    position: absolute;
    top: 0;
    left: 0;
    width: 210mm !important;   /* exact A4 width */
    min-height: 297mm !important;
    margin: 0 auto !important;
    overflow: hidden !important;
    background: white !important;
    box-sizing: border-box !important;
  }

  table {
    width: 100% !important;
    border-collapse: collapse !important;
    border-spacing: 0 !important;
    table-layout: fixed !important;   /* ✅ Fix uneven border spacing */
  }

  th, td {
    border: 1px solid black !important;
    padding: 4px !important;
    font-size: 10px !important;
  }

  /* ✅ Force the outermost table border to match edges perfectly */
  #pdf table {
    border-left: 2px solid black !important;
    border-right: 2px solid black !important;
    border-top: 2px solid black !important;
    border-bottom: 2px solid black !important;
  }

  #pdf th:last-child,
  #pdf td:last-child {
    border-right: 2px solid black !important; /* fixes thin right border */
  }

  @page {
    size: A4;
    margin: 10mm;
  }

  button, .header, .sidebar {
    display: none !important;
  }
}

`}
            </style>


            <Header />
            <Sidebar1 />
            <div className="main-body" id="main-body">

                <div className="container-2" style={{ borderRadius: "0px", width: "793px", height: "40px", border: "none" }}>

                    <div className="container-2" style={{ borderRadius: "0px", width: "793px", display: "flex", flexDirection: "row", border: "none", justifyContent: "end", gap: "10px", fontSize: "12px", alignItems: "center" }}>
                        <button
                            onClick={generatePDF}
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

                <div className="container-2" ref={pageRef} id="pdf" style={{
                    borderRadius: "0px", paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"
                    , paddingBottom: "20px", width: "793px", direction: "flex", fontFamily: '"Times New Roman", Times, serif',
                    flexDirection: "column", gap: "5px", fontSize: "10px", fontWeight: "bold", border: "none"
                }}>

                    <div className="container-2" style={{ borderRadius: "0px", border: "none", width: "750px", display: "flex", flexDirection: "column" }}>
                        < div id="printable-section" className="container-3" style={{ padding: "0px", border: "none" }}>
                            <div className="container-3 px-0 py-0" style={{ border: "2px solid black", height: "815px" }}>

                                <div className="div1" style={{ display: "flex", flexDirection: "row", borderBottom: "2px solid black", }}>
                                    <div style={{ width: "50%", borderRight: "2px solid black", display: "flex", gap: "10px",flexDirection:"column",paddingBottom:"20px" }}>
                                        
                                        <div style={{ display: "flex", width: "100%", flexDirection:"column", justifyContent: "end", paddingLeft:"10px"}}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center" ,gap:"5px"}}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>INVOICE NO:</div>
                                                <div>{invoiceData.InvoiceNo}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center",gap:"5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>INVOICE DATE :</div>
                                                <div>{invoiceData.InvoiceDate}</div>
                                            </div>
                                        </div>
                                         <div style={{ display: "flex", width: "100%", flexDirection:"column", justifyContent: "end", paddingLeft:"10px"}}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center" ,gap:"5px"}}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>TOTAL PIECES :</div>
                                                <div>1</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center" ,gap:"5px"}}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>HARGEABLE WEIGHT :</div>
                                                <div>11</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center",alignItems:"end" }}>
                                        <div style={{ display: "flex", width: "100%", flexDirection:"column", justifyContent: "end", paddingLeft:"10px"}}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center" ,gap:"5px"}}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>DOCKET NO:</div>
                                                <div>{invoiceData.DocketNo}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>OTHER REFERENCE</div>
                                                <div>{invoiceData.InvoiceDate}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center",gap:"5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>{invoiceData.KYC_Type}:</div>
                                                <div>{invoiceData.KYC_No}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div2" style={{ display: "flex", flexDirection: "row", borderBottom: "2px solid black", }}>
                                    <div style={{ width: "50%", borderRight: "2px solid black", display: "flex", paddingBottom: "5px", flexDirection: "column", paddingLeft: "8px", paddingTop: "5px", gap: "2px" }}>
                                        <div style={{ fontSize: "12px" }}>SHIPPER TO</div>
                                        <div style={{ fontSize: "13px", fontWeight: "bolder" }}>{invoiceData.ShipperName}</div>
                                        <div style={{ display: "flex", gap: "2px" }}>
                                            <div style={{ width: "12%" }}> Address:</div>
                                            <div style={{ width: "80%" }}>{invoiceData.ShipperAdd},{invoiceData.Shipper_Add2},{invoiceData.Shipper_Add3},
                                                {invoiceData.Shippercity}, {invoiceData.StateCode}, {invoiceData.ShipperPin}</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}>GST No:</div>
                                                <div>{invoiceData.Shipper_GstNo} </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}> State Name:</div>
                                                <div>{invoiceData.StateCode}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}> Mobile No:</div>
                                                <div> (+91) {invoiceData.ShipperPhone}  </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%", paddingBottom: "5px", display: "flex", flexDirection: "column", paddingLeft: "8px", paddingTop: "5px", gap: "2px" }}>
                                        <div style={{ fontSize: "12px" }}>CONSIGNEE TO</div>
                                        
                                        <div style={{ fontSize: "13px", fontWeight: "bolder" }}>{invoiceData?.Consignee_Name}</div>
                                        <div style={{ display: "flex", gap: "2px" }}>
                                            <div style={{ width: "12%" }}> Address:</div>
                                            <div style={{ width: "80%" }}> {invoiceData?.Consignee_Add1},{invoiceData?.Consignee_Add2},
                                                {invoiceData?.Consignee_City}, {invoiceData.ConsigneeState}, {invoiceData?.Consignee_Pin}</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}>GST No:</div>
                                                <div>{invoiceData?.Consignee_GST} </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}> State Name:</div>
                                                <div>{invoiceData.ConsigneeState}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}> Mobile No:</div>
                                                <div> (+91) {invoiceData?.Consignee_Mob}  </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div3" style={{
                                    height: "30px",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                    borderBottom: "2px solid black",
                                    backgroundColor: "rgba(255, 192, 203, 0.1)"

                                }}>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>S.NO</div>
                                    <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>DISCRIPTION</div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>UNIT TYPE</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>QTY</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>UNIT RATE</div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>AMOUNT</div>
                                </div>

                                <div className="mid" 
                                style={{
                                    height: "30px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    gap:"5px",
                                    fontSize:"15px",
                                    fontWeight:"bold",
                                    borderBottom:"2px solid black"
                                }}>
                                    <div>BOX : 1</div>
                                    <div>, ACTUAL WEIGHT - 10.70 KG</div>
                                </div>

                                <div className="div4" style={{
                                    height: "532px",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                    {/* S.NO */}
                                    <div style={{ width: "10%", display: "flex", flexDirection: "column", borderRight: "2px solid black", gap: "5px", paddingTop: "5px" }}>
                                        {getItem.map((item, ind) => (
                                            <div >{ind + 1}</div>
                                        ))}
                                    </div>

                                    {/* ITEMS */}
                                    <div style={{ width: "40%", display: "flex", flexDirection: "column", borderRight: "2px solid black", gap: "5px", paddingTop: "5px", textAlign: "start", paddingLeft: "10px" }}>
                                        {getItem.map((item) => (
                                            <div >{item?.Description}</div>
                                        ))}
                                    </div>

                                    {/* HSN */}
                                    <div style={{ width: "15%", display: "flex", flexDirection: "column", borderRight: "2px solid black", gap: "5px", paddingTop: "5px" }}>
                                        {getItem.map((item) => (
                                            <div >{item?.UnitType}</div>
                                        ))}
                                    </div>

                                    {/* QTY */}
                                    <div style={{ width: "10%", display: "flex", flexDirection: "column", borderRight: "2px solid black", gap: "5px", paddingTop: "5px" }}>
                                        {getItem.map((item) => (
                                            <div >{item?.Qty}</div>
                                        ))}
                                    </div>

                                    {/* RATE */}
                                    <div style={{ width: "10%", display: "flex", flexDirection: "column", borderRight: "2px solid black", gap: "5px", paddingTop: "5px" }}>
                                        {getItem.map((item) => (
                                            <div >{item?.UnitRate}</div>
                                        ))}
                                    </div>

                                    {/* AMOUNT */}
                                    <div style={{ width: "15%", display: "flex", flexDirection: "column", gap: "5px", paddingTop: "5px" }}>
                                        {getItem.map((item) => (
                                            <div >{item?.Amount}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="div5" style={{ height: "25px", textAlign: "center", display: "flex", flexDirection: "row", }}>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                                </div>
                                <div className="div6" style={{ height: "25px", textAlign: "center", display: "flex", flexDirection: "row", }}>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                                </div>
                                <div className="div7" style={{ height: "25px", textAlign: "center", display: "flex", flexDirection: "row", borderBottom: "2px solid black" }}>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}></div>
                                    <div style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                                </div>
                                <div className="div8" style={{ height: "30px", textAlign: "center", display: "flex", flexDirection: "row", backgroundColor: "rgba(255, 192, 203, 0.1)" }}>

                                    <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>AMOUNT CHARGEABLE</div>
                                    <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>{ numberToIndianCurrency(Number(totalAmount))}</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>TOTAL</div>
                                    <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>{totalAmount}</div>
                                </div>


                            </div>
                           
                                <div style={{display:"flex",border:"2px solid black",borderTop:"none"}}>
                                    <div style={{width:"50%",padding:"5px",borderRight:"2px solid black"}}>NOTES</div>
                                    <div style={{width:"50%",padding:"5px"}}> SIGNATURE / STAMP</div>
                                </div>
                                 <div style={{display:"flex",border:"2px solid black",borderTop:"none",minHeight:"100px"}}>
                                    <div style={{width:"50%",padding:"5px",borderRight:"2px solid black"}}>UNSOLICITED GIFT SENT TO MY FRIENDS & FAMILY
MEMBERS FOR THERE PERSONAL USE ONL</div>
                                    <div style={{width:"50%",padding:"5px"}}> </div>
                                </div>
                                
                            
                        </div>
                    </div >
                </div>
            </div >
        </>
    );
}

export default PerformaPdf;