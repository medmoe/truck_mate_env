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

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/truck-list" element={<TruckList />} />
            <Route path="/truck-detail" element={<TruckDetail />} />
            <Route path="/driver-list" element={<DriverList />} />
            <Route path="/driver-detail" element={<DriverDetail />} />
            <Route path="/add-truck" element={<TruckForm />} />
            <Route path="/add-driver" element={<DriverForm />} />
        </Routes>
    </Router>
  );
}

export default App;
