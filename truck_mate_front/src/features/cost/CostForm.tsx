import React, {FormEvent, useState} from "react";
import styles from './Cost.module.css';
import {CostInfo} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";

export function CostForm () {
    const user_id = localStorage.getItem("user_id");
    const drivers = [1,2,3,4]
    const trucks = [1,2,3,4]
    let initState: CostInfo = {
        "owner": user_id ? parseInt(user_id, 10): null,
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
        const target = event.target as HTMLInputElement
        setCostData({
            ...costData,
            [target.name]: target.value
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
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="truck" className="form-label">Truck</label>
                    <select onChange={handleChange} className="form-select" id="truck" name="truck" required>
                        <option value="">Select a truck</option>
                        <option>1</option>
                        <option>2</option>
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