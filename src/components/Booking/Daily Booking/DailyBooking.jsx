import { useState } from "react";
import Header from "../../../Components-2/Header/Header";
import Sidebar1 from "../../../Components-2/Sidebar1";
import Footer from "../../../Components-2/Footer";
import EmailBooking from "./EmailBooking";
import DailyExpenses from "./DailyExpenses";
import Booking from "./Booking";
import ShortEntry from "./ShortEntry";
import ExcelImportBulk from "./ExcelImportBulk";
import BookingPrint from "./BookingPrint";
import "./DailyBooking.css";
import { useLocation } from "react-router-dom";
import Performa from "./Performa";
import ForwardingInt from "./ForwardingInt";

function DailyBooking() {
  const location = useLocation();

  // 👇 API permissions (Coming from previous page)
  const permissions = JSON.parse(localStorage.getItem("Login")) || {};

  // Helper: show only if API value = 1
  const has = (key) => permissions[key] === 1;

  const [activeTab, setActiveTab] = useState(location?.state?.tab || null);

  // ===================== TABS LIST WITH PERMISSIONS =====================
  const tabs = [
    { id: "vendor", label: "Docket Booking", component: <Booking />, show: has("DocketBooking") },
    { id: "print", label: "Docket Print", component: <BookingPrint />, show: has("DocketPrint1") },
    { id: "viewPerformance", label: "Performa Invoice", component: <Performa />, show: 1},
    { id: "Forwarding", label: "Forwarding international", component: <ForwardingInt />, show: 1},
    { id: "vendorrate", label: "Cash To Pay Received", component: <DailyExpenses />, show: has("CoshTopayBooking") },
    { id: "vendorfuel", label: "Send Bulk Email", component: <EmailBooking />, show: has("AutoMail") },
    { id: "excelimport", label: "Bulk Booking", component: <ExcelImportBulk />, show: has("BulkImportData") },
  ];

  // Filter only visible tabs
  const visibleTabs = tabs.filter((t) => t.show);

  // If no default activeTab, set first visible tab
  if (!activeTab && visibleTabs.length > 0) {
    setActiveTab(visibleTabs[0].id);
  }

  return (
    <>
      <Header />
      <Sidebar1 />
      <div className="main-body" id="main-body">
        <div className="container">

          {/* ===================== NAVIGATION ===================== */}
          <nav>
            {visibleTabs.map((tab) => (
              <label
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                
              >
                {tab.label}
              </label>
            ))}

            {/* ===================== SLIDER ===================== */}
            <div
              className="slider"
              style={{
                left: `${visibleTabs.findIndex((t) => t.id === activeTab) * (100 / visibleTabs.length)}%`,
                width: `${100 / visibleTabs.length}%`,
              }}
            />
          </nav>

          {/* ===================== TAB CONTENT ===================== */}
          <section>
            {visibleTabs.find((t) => t.id === activeTab)?.component}
          </section>

        </div>
        <Footer />
      </div>
    </>
  );
}

export default DailyBooking;
