import React, {FormEvent, useState} from "react";
import styles from './Cost.module.css';
import {CostInfo} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectDrivers, selectTrucks, selectUserId} from "../user/userSlice";

export function CostForm () {
    const user_id = useAppSelector(selectUserId);
    const drivers = useAppSelector(selectDrivers);
    const trucks = useAppSelector(selectTrucks);
    let initState: CostInfo = {
        "owner": user_id,
        "driver": 0,
        "truck": 0,
        "date": "",
        "gaz_refill": 0,
        "maintenance": 0,
        "description": "",
    }
    const [costData, setCostData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const numberProperties = ['driver', 'truck', 'gaz_refill', 'maintenance']
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (costData.owner) {
            axios.post("http://localhost:8000/cost/", JSON.stringify(costData), {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Token ${token}`,
                }, withCredentials: true
            })
                .then((res) => {
                    navigate("/cost-list");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const {name, value} = event.target as HTMLInputElement
        setCostData({
            ...costData,
            [name]: numberProperties.includes(name)? +value:value,
        })
    }
    return (
        <div>
            <NavigationBar />
            <form className={styles.cost_form}>
                <div className="mb-3">
                    <label htmlFor="driver" className="form-label">Driver</label>
                    <select onChange={handleChange} className="form-select" id="driver" name="driver" required>
                        <option value="">Select a driver</option>
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
                        {trucks.map((truck) => (
                            <option key={truck.id} value={truck.id}>
                                {truck.brand} {truck.model}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="date" name="date" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="gaz_refill" className="form-label">Gaz</label>
                    <input onChange={handleChange} type="number" className="form-control" id="gaz_refill" name="gaz_refill" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="maintenance" className="form-label">Maintenance</label>
                    <input onChange={handleChange} type="number" className="form-control" id="maintenance" name="maintenance" required />
                </div>
                <div className="mb-3" >
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={handleChange} className="form-control" id="description" name="description" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}