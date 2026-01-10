import { useState } from "react";
import Header from "../../../Components-2/Header/Header";
import Sidebar1 from "../../../Components-2/Sidebar1";
import Footer from "../../../Components-2/Footer";
import EmailBooking from "./EmailBooking";
import DailyExpenses from "./DailyExpenses";
import Booking from "./Booking";
import ExcelImportBulk from "./ExcelImportBulk";
import "./DailyBooking.css";
import { useLocation } from "react-router-dom";
import Performa from "./Performa";
import ForwardingInt from "./ForwardingInt";
import RateCal from "./RateCal";

function DailyBooking() {
  const location = useLocation();

  const permissions = JSON.parse(localStorage.getItem("Login")) || {};
  const has = (key) => permissions[key] === 1;

  const [activeTab, setActiveTab] = useState(location?.state?.tab || null);

  // 🔥 NEW: shared docket state
  const [selectedDocket, setSelectedDocket] = useState(null);

  const tabs = [
    {
      id: "vendor",
      label: "Docket Booking",
      component: (
        <Booking
          selectedDocket={selectedDocket}
          setSelectedDocket={setSelectedDocket}
        />
      ),
      show: has("DocketBooking"),
    },
    {
      id: "viewPerformance",
      label: "Performa Invoice",
      component: (
        <Performa
          switchToBooking={(docketNo) => {
            setSelectedDocket(docketNo);
            setActiveTab("vendor"); // 🔥 SWITCH TAB
          }}
        />
      ),
      show: 1,
    },
    {
      id: "Forwarding",
      label: "Forwarding international",
      component: <ForwardingInt />,
      show: 1,
    },
    {
      id: "rate",
      label: "Rate Calculator",
      component: <RateCal />,
      show: 1,
    },
    {
      id: "vendorrate",
      label: "Cash To Pay Received",
      component: <DailyExpenses />,
      show: has("CoshTopayBooking"),
    },
    {
      id: "vendorfuel",
      label: "Send Bulk Email",
      component: <EmailBooking />,
      show: has("AutoMail"),
    },
    {
      id: "excelimport",
      label: "Bulk Booking",
      component: <ExcelImportBulk />,
      show: has("BulkImportData"),
    },
  ];

  const visibleTabs = tabs.filter((t) => t.show);

  if (!activeTab && visibleTabs.length > 0) {
    setActiveTab(visibleTabs[0].id);
  }

  return (
    <>
      <Header />
      <Sidebar1 />

      <div className="main-body" id="main-body">
        <div className="container">

          {/* NAVIGATION */}
          <nav>
            {visibleTabs.map((tab) => (
              <label
                key={tab.id}
                
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </label>
            ))}

            <div
              className="slider"
              style={{
                left: `${
                  visibleTabs.findIndex((t) => t.id === activeTab) *
                  (100 / visibleTabs.length)
                }%`,
                width: `${100 / visibleTabs.length}%`,
              }}
            />
          </nav>

          {/* TAB CONTENT */}
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
