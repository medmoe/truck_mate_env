import React from 'react';
import {Login} from '../src/features/user/login/Login'
import {Dashboard} from "./features/dashboard/Dashboard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUp} from "./features/user/signup/SignUp";
import {TruckList} from "./features/truck/TruckList";
import {TruckDetail} from "./features/truck/TruckDetail";
import {DriverList} from "./features/driver/DriverList";
import {DriverDetail} from "./features/driver/DriverDetail";
import {TruckForm} from "./features/truck/TruckForm";
import {DriverForm} from "./features/driver/DriverForm";
import {PerformanceList} from "./features/performance/PerformanceList";
import {PerformanceDetail} from "./features/performance/PerformanceDetail";
import {PerformanceForm} from "./features/performance/PerformanceForm";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Truck routes */}
            <Route path="/truck-list" element={<TruckList />} />
            <Route path="/truck-detail" element={<TruckDetail />} />
            <Route path="/add-truck" element={<TruckForm />} />
            {/* Driver routes */}
            <Route path="/driver-list" element={<DriverList />} />
            <Route path="/driver-detail" element={<DriverDetail />} />
            <Route path="/add-driver" element={<DriverForm />} />
            {/* Performance routes */}
            <Route path="/performance-list" element={<PerformanceList />} />
            <Route path="/performance-detail" element={<PerformanceDetail />} />
            <Route path="/add-performance" element={<PerformanceForm />} />
        </Routes>
    </Router>
  );
}

export default App;
