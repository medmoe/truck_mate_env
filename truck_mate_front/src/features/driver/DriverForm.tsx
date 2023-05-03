import React, {FormEvent, useState} from 'react';
import styles from './Driver.module.css'
import {useNavigate} from "react-router-dom";
import {DriverInfo} from "../../types/types";
import axios from "axios";
import {NavigationBar} from "../dashboard/NavigationBar";

export function DriverForm() {
    const user_id = localStorage.getItem("user_id");
    let initState: DriverInfo = {
        "owner": user_id ? parseInt(user_id, 10): null,
        "first_name": "",
        "last_name": "",
        "date_of_birth": "",
        "address": "",
        "phone_number": "",
        "starting_date": "",
        "ending_date": "????-??-??",
    }
    const [driverData, setDriverData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(driverData);
        if (driverData.owner){
            axios.post("http://localhost:8000/drivers/", JSON.stringify(driverData), {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Token ${token}`,
                }, withCredentials: true
            })
                .then((res) => {
                    navigate("/driver-list");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        console.log("Iam here");
        const target = event.target as HTMLInputElement
        setDriverData({
            ...driverData,
            [target.name]: target.value
        })
    }
    return (
        <div>
            <NavigationBar />
            <form className={styles.driver_form}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="firstName" name="first_name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="lastName" name="last_name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input onChange={handleChange} type="date" className="form-control" id="dob" name="date_of_birth" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input onChange={handleChange} type="text" className="form-control" id="address" name="address" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input onChange={handleChange} type="tel" className="form-control" id="phoneNumber" name="phone_number" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="startingDate">Starting Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="startingDate" name="starting_date" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="endingDate">Ending Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="endingDate" name="ending_date" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}