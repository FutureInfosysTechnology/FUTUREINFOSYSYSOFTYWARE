import { useEffect, useState } from "react";
import './nav.css';
import '../Dashboard/Mainstyle.css';
import Navnotice from "./Navnotice";
import Navavtar from "./Navavtar";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getApi } from "../../components/Admin Master/Area Control/Zonemaster/ServicesApi"; // ✅ ADD
import { useDashboard } from "./DashboardContext";

function Nav() {

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [formData, setFormData] = useState({
    fromdt: firstDayOfMonth,
    todt: today,
    BranchName: JSON.parse(localStorage.getItem("Login"))?.Branch_Code
  });

  const handleDateChange = (date, field) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const loadAllDashboardData = async () => {
  try {
    const results = await Promise.allSettled([
      getApi(`/Master/DashboardBKSummary?Location_Code=${formData.BranchName}&FromDate=${formData.fromdt}&ToDate=${formData.todt}`),
      getApi(`/Master/DashboardManifestSummary?Location_Code=${formData.BranchName}&FromDate=${formData.fromdt}&ToDate=${formData.todt}`),
      getApi(`/Master/DashboardInsconSummary?Location_Code=${formData.BranchName}&FromDate=${formData.fromdt}&ToDate=${formData.todt}`),
      getApi(`/Master/DashboardRunsheetSummary?Location_Code=${formData.BranchName}&FromDate=${formData.fromdt}&ToDate=${formData.todt}`)
    ]);

    const [bk, manifest, inscon, runsheet] = results;

    const DashboardData = {
      booking: bk.status === "fulfilled" ? bk.value?.Data : {},
      manifest: manifest.status === "fulfilled" ? manifest.value?.Data : {},
      inscon: inscon.status === "fulfilled" ? inscon.value?.Data : {},
      runsheet: runsheet.status === "fulfilled" ? runsheet.value?.Data : {}
    };

    console.log("DashboardData:", DashboardData);
    localStorage.setItem("Dashboard", JSON.stringify(DashboardData));

  } catch (error) {
    console.error("Dashboard API Error:", error);
  }
};


  useEffect(() => {
    loadAllDashboardData();
  }, [formData.fromdt, formData.todt]);

  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center" style={{ gap: "10px" }}>
        <DatePicker
          selected={formData.fromdt}
          onChange={(date) => handleDateChange(date, "fromdt")}
          dateFormat="dd/MM/yyyy"
          className="form-control form-control-sm"
        />
        <DatePicker
          selected={formData.todt}
          onChange={(date) => handleDateChange(date, "todt")}
          dateFormat="dd/MM/yyyy"
          className="form-control form-control-sm"
        />
        <Navnotice />
        <Navavtar />
      </ul>
    </nav>
  );
}

export default Nav;
