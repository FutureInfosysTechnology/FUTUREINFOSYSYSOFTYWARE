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

        const canvas = await html2canvas(pageRef.current, {
            scale: 2,            // high enough quality
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.7);

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let finalWidth = imgWidth;
        let finalHeight = imgHeight;

        // 🔹 If image height exceeds page, scale it down
        if (imgHeight > pdfHeight) {
            const scale = pdfHeight / imgHeight;
            finalWidth *= scale;
            finalHeight *= scale;
        }

        pdf.addImage(imgData, "JPEG", 0, 0, finalWidth, finalHeight);
        pdf.save(`Performa_${DocketNo}.pdf`);
    };



    // if (loading) return <p>Loading...</p>;

    return (
        <>

            <style>
                {`
   @media print {
  body {
    -webkit-print-color-adjust: exact; /* Chrome/Safari */
    color-adjust: exact;               /* Firefox */
  }

  #pdf {
    display: block;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  /* Keep your content visible */
  #pdf * {
    visibility: visible;
  }
}

  `}
            </style>

            <Header />
            <Sidebar1 />
            <div className="main-body" id="main-body">

                <div className="container-2" style={{ borderRadius: "0px", width: "813px", height: "40px", border: "none" }}>

                    <div className="container-2" style={{ borderRadius: "0px", width: "813px", display: "flex", flexDirection: "row", border: "none", justifyContent: "end", gap: "10px", fontSize: "12px", alignItems: "center" }}>
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
                    , paddingBottom: "20px", width: "813px", direction: "flex", fontFamily: "Arial, Helvetica, sans-serif",
                    flexDirection: "column", gap: "5px", fontSize: "10px", fontWeight: "bold", border: "none"
                }}>

                    <div className="" style={{ borderRadius: "0px", border: "none", width: "772px", display: "flex", flexDirection: "column" }}>
                        < div id="printable-section" className="container-3" style={{ padding: "0px", border: "none" }}>
                            <div className=" px-0 py-0" style={{ border: "2px solid black" }}>

                                <div className="div1" style={{ display: "flex", flexDirection: "row", borderBottom: "2px solid black", fontSize: "14px" }}>
                                    <div style={{ width: "50%", borderRight: "2px solid black", display: "flex", gap: "10px", flexDirection: "column", padding: "10px" }}>

                                        <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "end", lineHeight: "1.1" }}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>INVOICE NO:</div>
                                                <div>{invoiceData.InvoiceNo}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>INVOICE DATE :</div>
                                                <div>{invoiceData.BookDate}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "end", lineHeight: "1.1" }}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>TOTAL PIECES :</div>
                                                <div> {invoiceData?.Items?.reduce((acc, d) => acc + parseFloat(d.Qty || 0), 0)}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>TOTAL WEIGHT :</div>
                                                <div>{invoiceData?.TotalWeight}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%", display: "flex", gap: "10px", flexDirection: "column", paddingBottom: "20px", padding: "10px" }}>

                                        <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "end", lineHeight: "1.1" }}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>DOCKET NO:</div>
                                                <div>{invoiceData.DocketNo}</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}> {invoiceData?.KYC_Type} :</div>
                                                <div>{invoiceData?.KYC_No}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "end", lineHeight: "1.1" }}>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}>ORIGIN NAME :</div>
                                                <div>INDIA</div>
                                            </div>
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                                <div style={{ fontSize: "12px", fontWeight: "bolder" }}> DESTINATION NAME :</div>
                                                <div>{invoiceData?.DestinationCity}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div2" style={{ display: "flex", flexDirection: "row", borderBottom: "2px solid black", fontSize: "13px" }}>
                                    <div style={{ width: "50%", borderRight: "2px solid black", display: "flex", paddingBottom: "5px", flexDirection: "column", paddingLeft: "8px", paddingTop: "5px", gap: "2px" }}>
                                        <div style={{ fontSize: "14px" }}>SHIPPER TO</div>
                                        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>{invoiceData.Shipper_Name}</div>
                                        <div style={{ display: "flex", gap: "2px" }}>
                                            <div style={{ width: "15%" }}> Address:</div>
                                            <div style={{ width: "80%" }}>{invoiceData.ShipperAdd},{invoiceData.ShipperAdd2},
                                                {invoiceData.ShipperAdd3}, {invoiceData.PlaceofSupply}, {invoiceData.ShipperPin}</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}>GST No:</div>
                                                <div>{invoiceData.Shipper_GstNo} </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "5px" }}>
                                                <div style={{ fontWeight: "bolder" }}> State Name:</div>
                                                <div>{invoiceData.PlaceofSupply}</div>
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
                                        <div style={{ fontSize: "14px" }}>CONSIGNEE TO</div>

                                        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>{invoiceData?.Consignee_Name}</div>
                                        <div style={{ display: "flex", gap: "2px" }}>
                                            <div style={{ width: "15%" }}> Address:</div>
                                            <div style={{ width: "80%" }}> {invoiceData?.Consignee_Add1},{invoiceData?.Consignee_Add2},
                                                {invoiceData?.Country_Name}, {invoiceData.ConsigneeState}, {invoiceData?.Consignee_Pin}</div>
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
                                <div className="div3 rgba" style={{
                                    height: "30px",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                    borderBottom: "2px solid black",
                                    backgroundColor: "rgba(255, 192, 203, 0.1)"
                                    , fontSize: "12px"

                                }}>

                                    <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>DISCRIPTION</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>HSN CODE</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>UNIT TYPE</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>QTY</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>UNIT RATE</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>AMOUNT</div>
                                </div>



                                <div style={{ position: "relative", height: "670px", borderBottom: "2px solid black" }}>
                                    {/* BELOW (Header / Skeleton) */}
                                    <div
                                        className="below"
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            fontSize: "12px",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            zIndex: 1, // background
                                        }}
                                    >
                                        <div style={{ width: "50%", borderRight: "2px solid black" }}></div>
                                        <div style={{ width: "10%", borderRight: "2px solid black" }}></div>
                                        <div style={{ width: "10%", borderRight: "2px solid black" }}></div>
                                        <div style={{ width: "10%", borderRight: "2px solid black" }}></div>
                                        <div style={{ width: "10%" }}></div>
                                    </div>

                                    {/* ABOVE (Dynamic rows) */}
                                    <div
                                        className="above"
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            fontSize: "12px",
                                            position: "absolute", // make it overlap
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            zIndex: 2, // render on top
                                        }}
                                    >
                                        {getItem.map((item, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    borderBottom: "2px solid black",
                                                    minHeight: "40px",
                                                }}
                                            >
                                                <div style={{ width: "50%", borderRight: "2px solid black", padding: "5px 10px", lineHeight: "1.2" }}>
                                                    Box No : {invoiceData?.VolumetricDetails?.[i]?.Qty} [A.Wt:{invoiceData?.VolumetricDetails?.[i]?.ActualWt} KG]
                                                    [{invoiceData?.VolumetricDetails?.[i]?.Length} X {invoiceData?.VolumetricDetails?.[i]?.Width} X {invoiceData?.VolumetricDetails?.[i]?.Height} CM]
                                                    <div>{item?.Description}</div>
                                                </div>
                                                <div style={{ width: "10%", borderRight: "2px solid black", padding: "5px" }}>{item?.HSCode}</div>
                                                <div style={{ width: "10%", borderRight: "2px solid black", padding: "5px" }}>{item?.UnitType}</div>
                                                <div style={{ width: "10%", borderRight: "2px solid black", padding: "5px" }}>{item?.Qty}</div>
                                                <div style={{ width: "10%", borderRight: "2px solid black", padding: "5px" }}>{item?.UnitRate}</div>
                                                <div style={{ width: "10%", padding: "5px" }}>{item?.Amount}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>






                                <div className="div8 rgba" style={{ height: "30px", textAlign: "center", display: "flex", flexDirection: "row", backgroundColor: "rgba(255, 192, 203, 0.1)", fontSize: "12px" }}>

                                    <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>AMOUNT CHARGEABLE</div>
                                    <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>{numberToIndianCurrency(Number(totalAmount))}</div>
                                    <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>TOTAL</div>
                                    <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>{totalAmount}</div>
                                </div>


                            </div>

                            <div style={{ display: "flex", border: "2px solid black", borderTop: "none", fontSize: "12px" }}>
                                <div style={{ width: "50%", padding: "5px", borderRight: "2px solid black" }}>NOTES</div>
                                <div style={{ width: "50%", padding: "5px" }}> SIGNATURE / STAMP</div>
                            </div>
                            <div style={{ display: "flex", border: "2px solid black", borderTop: "none", minHeight: "100px", fontSize: "12px" }}>
                                <div style={{ width: "50%", padding: "5px", borderRight: "2px solid black" }}>UNSOLICITED GIFT SENT TO MY FRIENDS & FAMILY
                                    MEMBERS FOR THERE PERSONAL USE ONL</div>
                                <div style={{ width: "50%", padding: "5px" }}> </div>
                            </div>


                        </div>
                    </div >
                </div>
            </div >
        </>
    );
}

export default PerformaPdf;