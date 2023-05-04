import React, {FormEvent, useState} from "react";
import styles from './Performance.module.css';
import {PerformanceInfo} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectDrivers, selectTrucks, selectUserId} from "../user/userSlice";

export function PerformanceForm() {
    const user_id = useAppSelector(selectUserId);
    const drivers = useAppSelector(selectDrivers);
    const trucks = useAppSelector(selectTrucks);
    let initState: PerformanceInfo = {
        "owner": user_id,
        "driver": 0,
        "truck": 0,
        "date": "",
        "starting_quantity": 0,
        "ending_quantity": 0,
        "starting_time": "",
        "ending_time": "",
    }
    const [performanceData, setPerformanceData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const numberProperties = ['truck', 'driver', 'starting_quantity', 'ending_quantity', 'starting_mileage', 'ending_mileage'];
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(performanceData);
        axios.post("http://localhost:8000/performance/", JSON.stringify(performanceData), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }, withCredentials: true
        })
            .then((res) => {
                navigate("/performance-list");
            })
            .catch((err) => {
                console.log(err);
            })

    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const {name, value} = event.target as HTMLInputElement
        setPerformanceData({
            ...performanceData,
            [name]: numberProperties.includes(name)? +value : value,
        })
    }
    return (
        <div>
            <NavigationBar/>
            <form className={styles.performance_form}>
                <div className="mb-3">
                    <label htmlFor="driver" className="form-label">Driver</label>
                    <select onChange={handleChange} className="form-select" id="driver" name="driver" required>
                        <option value="">Select a driver</option>
                        {/* Loop over the drivers array and create an option for each driver */}
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.first_name} {driver.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="truck" className="form-label">Truck</label>
                    <select onChange={handleChange} className="form-select" id="truck" name="truck" required>
                        <option value="">Select a truck</option>
                        {/* Loop over the trucks array and create an option for each truck */}
                        {trucks.map((truck) => (
                            <option key={truck.id} value={truck.id}>
                                {truck.brand} {truck.model}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="date" name="date" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_mileage" className="form-label">Starting mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="starting_mileage"
                           name="starting_mileage" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_mileage" className="form-label">Ending mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="ending_mileage"
                           name="ending_mileage" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_quantity" className="form-label">Starting Quantity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="starting_quantity"
                           name="starting_quantity" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_quantity" className="form-label">Ending Quantity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="ending_quantity"
                           name="ending_quantity" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_time" className="form-label">Starting Time</label>
                    <input onChange={handleChange} type="time" className="form-control" id="starting_time"
                           name="starting_time"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_time" className="form-label">Ending Time</label>
                    <input onChange={handleChange} type="time" className="form-control" id="ending_time"
                           name="ending_time"
                           required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}
