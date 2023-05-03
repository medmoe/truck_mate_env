import React, {FormEvent, useState} from 'react';
import styles from './Truck.module.css';
import {TruckInfo} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";

export function TruckForm() {
    let user_id = localStorage.getItem("user_id");

    let initState: TruckInfo = {
        "owner": user_id ? parseInt(user_id, 10) : null,
        "brand": "",
        "model": "",
        "starting_date": "",
        "year": 0,
        "mileage": 0,
        "capacity": 0,
    }
    const [truckData, setTruckData] = useState(initState)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (truckData.owner) {
            axios.post("http://localhost:8000/trucks/", JSON.stringify(truckData), {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Token ${token}`,
                }, withCredentials: true
            })
                .then((res) => {
                    navigate("/truck-list")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        setTruckData({
            ...truckData,
            [target.name]: target.value
        })
    }
    return (
        <div>
            <NavigationBar />
            <form className={styles.truck_form}>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input onChange={handleChange} type="text" className="form-control" id="model" name="model"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input onChange={handleChange} type="text" className="form-control" id="brand" name="brand"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_date" className="form-label">Starting Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="starting_date"
                           name="starting_date" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input onChange={handleChange} type="number" className="form-control" id="year" name="year"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="mileage" className="form-label">Mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="mileage" name="mileage"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="capacity" name="capacity"
                           required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}