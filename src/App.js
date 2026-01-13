// import React, { createContext, useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import Tabs from './components/Tabs/Tabs';
// import CityMaster from './components/Admin Master/City Master/CityMaster';
// import CustomerList from './components/Admin Master/CustomerList/CustomerList';
// import Sidebar1 from './Components-2/Sidebar1'
// import VendorMaster from './components/Admin Master/Vendor Master/VendorMaster';
// import BranchMaster from './components/Admin Master/BranchMaster/BranchMaster';
// import Inventory from './components/Admin Master/Inventry/Inventory';
// import NewLogin from './components/Login-pages/NewLogin'
// import Dashboard from './Components-2/Dashboard/Dashboard';
// import Signup from './components/Login-pages/Signup';
// import PodEntry from './components/Booking/POD Update/PodEntry';
// import OrderEntry from './components/Laiser/OrderEntry';
// import PaymentEntry from './components/Laiser/PaymentEntry';
// import ProductionEntry from './components/Laiser/ProductionEntry';
// import Laiser from './components/Laiser/Laiser';
// import Inscan from './components/Booking/Inscan Data/Inscan';
// import DailyManifest from './components/Booking/Daily Manifest/DailyManifest';
// import RunsheetEntry from './components/Booking/Run Sheet Entry/RunsheetEntry';
// import StatusActivity from './components/Booking/Status Activity Entry/StatusActivity';
// import CustomerCharges from './components/Admin Master/Customer Charges/CustomerCharges';
// import DailyBooking from './components/Booking/Daily Booking/DailyBooking';
// import ViewInvoice from './components/Invoice/ViewInvoice';
// import PaymentReceived from './components/Laiser/PaymentReceived';
// import SignOut from './components/Login-pages/SignOut';
// import MyProfile from './Components-2/Header/MyProfile';
// import VehicleMaster from './components/Admin Master/Transport Master/VehicleMaster';
// import DocketPrint from './components/Docket Print/DocketPrint';
// import ZoneMaster from './components/Admin Master/Area Control/Zonemaster/Zonemaster';
// import Docketpdf from './components/Docket Print/Docketpdf';
// import Invoice from './components/Invoice/Invoice';
// import RegionMaster from './components/Admin Master/Region Master/RegionMaster';
// import DrsRunsheet from './components/Docket Print/DrsRunsheet';
// import Manifest from './components/Docket Print/Manifest';
// import MobileReceipt from './components/Docket Print/MobileReceipt';
// import CustomerQuery from './components/Booking/Customer Query/CustomerQuery';
// import StatusReport from './components/Booking/Status Report/StatusReport';
// import Statement from './components/Booking/Statement/Statement';
// import SalesRegister from './components/Booking/Sales Register/SalesRegister';
// import FirstInvoice from './components/Docket Print/FirstInvoice';
// import SecondInvoice from './components/Docket Print/SecondInvoice';
// import UserAdmin from './components/User Control/UserAdmin';
// import BranchAdmin from './components/User Control/BranchAdmin';
// import PerformanceInvoice from './components/Docket Print/PerformanceInvoice';
// import DocketBill from './components/Docket Print/DocketBill';
// import VendorBoxLabel from './components/Docket Print/VendorBoxLabel';
// import InternationalBooking from './components/Booking/InternationalBooking/International';
// import NewDP from './components/Docket Print/NewDp1';
// import NewDP2 from './components/Docket Print/NewDp2';
// import CreditPrint from './components/Docket Print/CreditPrint';
// import LabelPrintingPdf from './components/Docket Print/LabelPrintingPdf';
// import LabelPrintingPdf2 from './components/Docket Print/LabelPrintingPdf2';
// import BoxStickerPdf from './components/Docket Print/BoxStickerPdf';
// import VendorBillPrint from './components/Docket Print/VendorBillPrint';
// import VendorBill from './components/Booking/Daily Booking/VendorBill';
// import InternationalManifestPdf from './components/Docket Print/InternationalManifestPdf';
// import { DashboardProvider } from './Components-2/Header/DashboardContext';

// export const refeshPend = createContext();
// function App() {
//   const [ref, setRef] = useState(false);
//   const refFun = () => setRef(!ref);
//   const [hub, setHub] = useState(false);
//   const hubFun = () => setHub(!hub);
//   return (
//     <refeshPend.Provider value={{ ref, refFun, hub, hubFun }}>
//       <DashboardProvider>

//         <Router>
//           <div className="main">


//           <Routes>
//           <Route path='/NewLogin' element={<NewLogin/>} />
//           <Route path='/dashboard' element={<Dashboard />} />
//           <Route path='/sidebar1' element={<Sidebar1 />} />
//           <Route path="/login" element={<NewLogin/>} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/signout' element={<SignOut />} />
//           <Route path='/profile' element={<MyProfile />} />   

//               <Route path='/tab' element={<Tabs />} />
//               <Route path='/zonemaster' element={<ZoneMaster />} />
//               <Route path='/citymaster' element={<CityMaster />} />
//               <Route path='/customerlist' element={<CustomerList />} />
//               <Route path='/customercharges' element={<CustomerCharges />} />
//               <Route path='/vendormaster' element={<VendorMaster />} />
//               <Route path='/vehiclemaster' element={<VehicleMaster />} />
//               <Route path='/branchmaster' element={<BranchMaster />} />
//               <Route path='/inventory' element={<Inventory />} />
//               <Route path='/regionmaster' element={<RegionMaster />} />

//               <Route path='/dailybooking' element={<DailyBooking />} />
//               <Route path='/dailymanifest' element={<DailyManifest />} />
//               <Route path='/inscan' element={<Inscan />} />
//               <Route path='/runsheet' element={<RunsheetEntry />} />
//               <Route path='/statusactivity' element={<StatusActivity />} />
//               <Route path='/podentry' element={<PodEntry />} />
//               <Route path='/custquery' element={<CustomerQuery />} />
//               <Route path='/internationalbooking' element={<InternationalBooking />} />
//               <Route path='/vendorbill' element={<VendorBill />} />

//               <Route path='/docketprint' element={<DocketPrint />} />
//               <Route path='/docketpdf' element={<Docketpdf />} />
//               <Route path='/drsrunsheet' element={<DrsRunsheet />} />
//               <Route path='/manifest' element={<Manifest />} />
//               <Route path='/mobilereceipt' element={<MobileReceipt />} />
//               <Route path='/firstinvoice' element={<FirstInvoice />} />
//               <Route path='/secondinvoice' element={<SecondInvoice />} />
//               <Route path='/performanceinvoice' element={<PerformanceInvoice />} />
//               <Route path='/boxstickerprint' element={<BoxStickerPdf />} />
//               <Route path='/docketbill' element={<DocketBill />} />
//               <Route path='/vendorboxlabel' element={<VendorBoxLabel />} />
//               <Route path='/newdp' element={<NewDP />} />
//               <Route path='/newdp2' element={<NewDP2 />} />
//               <Route path='/creditprint' element={<CreditPrint />} />
//               <Route path='/vendorbillPrint' element={<VendorBillPrint />} />
//               <Route path='/labelprint' element={<LabelPrintingPdf />} />
//               <Route path='/labelprint2' element={<LabelPrintingPdf2 />} />
//               <Route path='/intmanifestpdf' element={<InternationalManifestPdf />} />

//               <Route path='/invoice' element={<Invoice />} />
//               <Route path='/viewinvoice' element={<ViewInvoice />} />

//               <Route path='/laiser' element={<Laiser />} />
//               <Route path='/paymentreceived' element={<PaymentReceived />} />

//               <Route path='/statusreport' element={<StatusReport />} />
//               <Route path='/statement' element={<Statement />} />
//               <Route path='/salesregister' element={<SalesRegister />} />

//               <Route path='/orderentry' element={<OrderEntry />} />
//               <Route path='/paymententry' element={<PaymentEntry />} />
//               <Route path='/productionentry' element={<ProductionEntry />} />

//               <Route path='/useradmin' element={<UserAdmin />} />
//               <Route path='/branchadmin' element={<BranchAdmin />} />
//             </Routes>
//           </div>
//         </Router>
//       </DashboardProvider>
//     </refeshPend.Provider>
//   );
// }

// export default App;


import React, { createContext, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= AUTH ================= */
import NewLogin from "./components/Login-pages/Login";
import Signup from "./components/Login-pages/Signup";
import SignOut from "./components/Login-pages/SignOut";

/* ================= CORE ================= */
import Dashboard from "./Components-2/Dashboard/Dashboard";
import Sidebar1 from "./Components-2/Sidebar1";
import MyProfile from "./Components-2/Header/MyProfile";

/* ================= MASTER ================= */
import Tabs from "./components/Tabs/Tabs";
import CityMaster from "./components/Admin Master/City Master/CityMaster";
import CustomerList from "./components/Admin Master/CustomerList/CustomerList";
import VendorMaster from "./components/Admin Master/Vendor Master/VendorMaster";
import BranchMaster from "./components/Admin Master/BranchMaster/BranchMaster";
import Inventory from "./components/Admin Master/Inventry/Inventory";
import ZoneMaster from "./components/Admin Master/Area Control/Zonemaster/Zonemaster";
import VehicleMaster from "./components/Admin Master/Transport Master/VehicleMaster";
import RegionMaster from "./components/Admin Master/Region Master/RegionMaster";
import CustomerCharges from "./components/Admin Master/Customer Charges/CustomerCharges";

/* ================= BOOKING ================= */
import DailyBooking from "./components/Booking/Daily Booking/DailyBooking";
import DailyManifest from "./components/Booking/Daily Manifest/DailyManifest";
import Inscan from "./components/Booking/Inscan Data/Inscan";
import RunsheetEntry from "./components/Booking/Run Sheet Entry/RunsheetEntry";
import StatusActivity from "./components/Booking/Status Activity Entry/StatusActivity";
import PodEntry from "./components/Booking/POD Update/PodEntry";
import CustomerQuery from "./components/Booking/Customer Query/CustomerQuery";
import InternationalBooking from "./components/Booking/InternationalBooking/International";
import VendorBill from "./components/Booking/Daily Booking/VendorBill";

/* ================= LAISER ================= */
import Laiser from "./components/Laiser/Laiser";
import OrderEntry from "./components/Laiser/OrderEntry";
import PaymentEntry from "./components/Laiser/PaymentEntry";
import ProductionEntry from "./components/Laiser/ProductionEntry";
import PaymentReceived from "./components/Laiser/PaymentReceived";

/* ================= PRINT ================= */
import DocketPrint from "./components/Docket Print/DocketPrint";
import Docketpdf from "./components/Docket Print/Docketpdf";
import DrsRunsheet from "./components/Docket Print/DrsRunsheet";
import Manifest from "./components/Docket Print/Manifest";
import MobileReceipt from "./components/Docket Print/MobileReceipt";
import FirstInvoice from "./components/Docket Print/FirstInvoice";
import SecondInvoice from "./components/Docket Print/SecondInvoice";

import PerformanceInvoice from "./components/Docket Print/PerformanceInvoice";
import DocketBill from "./components/Docket Print/DocketBill";
import VendorBoxLabel from "./components/Docket Print/VendorBoxLabel";
import BoxStickerPdf from "./components/Docket Print/BoxStickerPdf";
import NewDP from "./components/Docket Print/NewDp1";
import NewDP2 from "./components/Docket Print/NewDp2";
import CreditPrint from "./components/Docket Print/CreditPrint";
import LabelPrintingPdf from "./components/Docket Print/LabelPrintingPdf";
import LabelPrintingPdf2 from "./components/Docket Print/LabelPrintingPdf2";
import VendorBillPrint from "./components/Docket Print/VendorBillPrint";
import InternationalManifestPdf from "./components/Docket Print/InternationalManifestPdf";

/* ================= INVOICE / REPORT ================= */
import Invoice from "./components/Invoice/Invoice";
import ViewInvoice from "./components/Invoice/ViewInvoice";
import StatusReport from "./components/Booking/Status Report/StatusReport";
import Statement from "./components/Booking/Statement/Statement";
import SalesRegister from "./components/Booking/Sales Register/SalesRegister";

/* ================= USER CONTROL ================= */
import UserAdmin from "./components/User Control/UserAdmin";
import BranchAdmin from "./components/User Control/BranchAdmin";

/* ================= CONTEXT ================= */
import { DashboardProvider } from "./Components-2/Header/DashboardContext";
import ProtectedRoute from "./ProtectedRoute";
import PerformaPdf from "./components/Docket Print/PerformaPdf";
import ShortEntry from "./components/Booking/Daily Booking/ShortEntry";

/* ================= CONTEXT EXPORT ================= */
export const refeshPend = createContext();

function App() {
  const [ref, setRef] = useState(false);
  const refFun = () => setRef(!ref);

  const [hub, setHub] = useState(false);
  const hubFun = () => setHub(!hub);

  return (
    <refeshPend.Provider value={{ ref, refFun, hub, hubFun }}>
      <DashboardProvider>
        <Router>
          <Routes>

            {/* ===== DEFAULT ===== */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* ===== AUTH ===== */}
            <Route path="/login" element={<NewLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<SignOut />} />

            {/* ===== CORE ===== */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/sidebar1" element={<ProtectedRoute><Sidebar1 /></ProtectedRoute>} />

            {/* ===== MASTER ===== */}
            <Route path="/tab" element={<ProtectedRoute><Tabs /></ProtectedRoute>} />
            <Route path="/citymaster" element={<ProtectedRoute><CityMaster /></ProtectedRoute>} />
            <Route path="/customerlist" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
            <Route path="/vendormaster" element={<ProtectedRoute><VendorMaster /></ProtectedRoute>} />
            <Route path="/branchmaster" element={<ProtectedRoute><BranchMaster /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/zonemaster" element={<ProtectedRoute><ZoneMaster /></ProtectedRoute>} />
            <Route path="/vehiclemaster" element={<ProtectedRoute><VehicleMaster /></ProtectedRoute>} />
            <Route path="/regionmaster" element={<ProtectedRoute><RegionMaster /></ProtectedRoute>} />
            <Route path="/customercharges" element={<ProtectedRoute><CustomerCharges /></ProtectedRoute>} />

            {/* ===== BOOKING ===== */}
            <Route path="/dailybooking" element={<ProtectedRoute><DailyBooking /></ProtectedRoute>} />
            <Route path="/smartbooking" element={<ProtectedRoute><ShortEntry /></ProtectedRoute>} />
            <Route path="/dailymanifest" element={<ProtectedRoute><DailyManifest /></ProtectedRoute>} />
            <Route path="/inscan" element={<ProtectedRoute><Inscan /></ProtectedRoute>} />
            <Route path="/runsheet" element={<ProtectedRoute><RunsheetEntry /></ProtectedRoute>} />
            <Route path="/statusactivity" element={<ProtectedRoute><StatusActivity /></ProtectedRoute>} />
            <Route path="/podentry" element={<ProtectedRoute><PodEntry /></ProtectedRoute>} />
            <Route path="/custquery" element={<ProtectedRoute><CustomerQuery /></ProtectedRoute>} />
            <Route path="/internationalbooking" element={<ProtectedRoute><InternationalBooking /></ProtectedRoute>} />
            <Route path="/vendorbill" element={<ProtectedRoute><VendorBill /></ProtectedRoute>} />

            {/* ===== LAISER ===== */}
            <Route path="/laiser" element={<ProtectedRoute><Laiser /></ProtectedRoute>} />
            <Route path="/orderentry" element={<ProtectedRoute><OrderEntry /></ProtectedRoute>} />
            <Route path="/paymententry" element={<ProtectedRoute><PaymentEntry /></ProtectedRoute>} />
            <Route path="/productionentry" element={<ProtectedRoute><ProductionEntry /></ProtectedRoute>} />
            <Route path="/paymentreceived" element={<ProtectedRoute><PaymentReceived /></ProtectedRoute>} />

            {/* ===== PRINT ===== */}
            <Route path="/docketprint" element={<ProtectedRoute><DocketPrint /></ProtectedRoute>} />
            <Route path="/docketpdf" element={<ProtectedRoute><Docketpdf /></ProtectedRoute>} />
            <Route path="/drsrunsheet" element={<ProtectedRoute><DrsRunsheet /></ProtectedRoute>} />
            <Route path="/manifest" element={<ProtectedRoute><Manifest /></ProtectedRoute>} />
            <Route path="/mobilereceipt" element={<ProtectedRoute><MobileReceipt /></ProtectedRoute>} />
            <Route path="/firstinvoice" element={<ProtectedRoute><FirstInvoice /></ProtectedRoute>} />
            <Route path="/secondinvoice" element={<ProtectedRoute><SecondInvoice /></ProtectedRoute>} />
            <Route path="/performanceinvoice" element={<ProtectedRoute><PerformanceInvoice /></ProtectedRoute>} />
            <Route path="/performainvoice" element={<ProtectedRoute><PerformaPdf /></ProtectedRoute>} />
            <Route path="/docketbill" element={<ProtectedRoute><DocketBill /></ProtectedRoute>} />
            <Route path="/vendorboxlabel" element={<ProtectedRoute><VendorBoxLabel /></ProtectedRoute>} />
            <Route path="/boxstickerprint" element={<ProtectedRoute><BoxStickerPdf /></ProtectedRoute>} />
            <Route path="/newdp" element={<ProtectedRoute><NewDP /></ProtectedRoute>} />
            <Route path="/newdp2" element={<ProtectedRoute><NewDP2 /></ProtectedRoute>} />
            <Route path="/creditprint" element={<ProtectedRoute><CreditPrint /></ProtectedRoute>} />
            <Route path="/labelprint" element={<ProtectedRoute><LabelPrintingPdf /></ProtectedRoute>} />
            <Route path="/labelprint2" element={<ProtectedRoute><LabelPrintingPdf2 /></ProtectedRoute>} />
            <Route path="/vendorbillprint" element={<ProtectedRoute><VendorBillPrint /></ProtectedRoute>} />
            <Route path="/intmanifestpdf" element={<ProtectedRoute><InternationalManifestPdf /></ProtectedRoute>} />

            {/* ===== INVOICE / REPORT ===== */}
            <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
            <Route path="/viewinvoice" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} />
            <Route path="/statusreport" element={<ProtectedRoute><StatusReport /></ProtectedRoute>} />
            <Route path="/statement" element={<ProtectedRoute><Statement /></ProtectedRoute>} />
            <Route path="/salesregister" element={<ProtectedRoute><SalesRegister /></ProtectedRoute>} />

            {/* ===== USER CONTROL ===== */}
            <Route path="/useradmin" element={<ProtectedRoute><UserAdmin /></ProtectedRoute>} />
            <Route path="/branchadmin" element={<ProtectedRoute><BranchAdmin /></ProtectedRoute>} />

          </Routes>
        </Router>
      </DashboardProvider>
    </refeshPend.Provider>
  );
}

export default App;
