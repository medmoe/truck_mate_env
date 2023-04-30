import React from 'react';
import {Login} from '../src/features/user/login/Login'
import {Dashboard} from "./features/dashboard/Dashboard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUp} from "./features/user/signup/SignUp";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  );
}

export default App;
