import React, {FormEvent, useState} from "react";
import styles from './Cost.module.css';
import {CostInfo, API} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectDrivers, selectTrucks, selectUserId} from "../user/userSlice";
import {
    selectIsCreate,
    selectDate,
    selectDescription,
    selectDriver,
    selectGazRefill,
    selectId,
    selectMaintenance,
    selectTruck,
} from "./costSlice";

export function CostForm() {
    /* cost state info */
    const id = useAppSelector(selectId);
    const isCreate = useAppSelector(selectIsCreate);
    const driver = useAppSelector(selectDriver);
    const truck = useAppSelector(selectTruck);
    const date = useAppSelector(selectDate);
    const gazRefill = useAppSelector(selectGazRefill);
    const maintenance = useAppSelector(selectMaintenance);
    const description = useAppSelector(selectDescription);

    const user_id = useAppSelector(selectUserId);
    const drivers = useAppSelector(selectDrivers);
    const trucks = useAppSelector(selectTrucks);
    let initState: CostInfo = {
        "owner": user_id,
        "driver": driver,
        "truck": truck,
        "date": date,
        "gaz_refill": gazRefill,
        "maintenance": maintenance,
        "description": description,
    }
    const [costData, setCostData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const numberProperties = ['gaz_refill', 'maintenance']
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (costData.owner) {
            if (isCreate) {
                axios.post(`${API}cost/`, JSON.stringify(costData), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    }, withCredentials: true
                })
                    .then((res) => {
                        navigate("/cost-list");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                axios.put(`${API}cost/${id}/`, JSON.stringify(costData), {
                    headers: {
                        'Content-Type': "application/json",
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
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const {name, value} = event.target as HTMLInputElement
        let newValue = value
        if (name === 'truck' || name === 'driver') {
            newValue = JSON.parse(value);
        }
        setCostData({
            ...costData,
            [name]: numberProperties.includes(name) ? +newValue : newValue,
        })
    }
    const deleteItem = (event: FormEvent) => {
        event.preventDefault();
        axios.delete(`${API}cost/${id}`, {
            headers: {
                'Content-Type': 'application/json',
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
    const cancelEdit = (event: FormEvent) => {
        event.preventDefault();
        navigate('/cost-list');
    }
    return (
        <div>
            <NavigationBar/>
            <form className={styles.cost_form}>
                <div className="mb-3">
                    <label htmlFor="driver" className="form-label">Driver</label>
                    <select onChange={handleChange} className="form-select" id="driver" name="driver" required>
                        <option value="">Select a driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={JSON.stringify(driver)}>
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
                            <option key={truck.id} value={JSON.stringify(truck)}>
                                {truck.brand} {truck.model}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="date" name="date"
                           defaultValue={date} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="gaz_refill" className="form-label">Gaz</label>
                    <input onChange={handleChange} type="number" className="form-control" id="gaz_refill"
                           name="gaz_refill" defaultValue={gazRefill} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="maintenance" className="form-label">Maintenance</label>
                    <input onChange={handleChange} type="number" className="form-control" id="maintenance"
                           name="maintenance" defaultValue={maintenance} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={handleChange} className="form-control" id="description" name="description"
                              defaultValue={description}/>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="submit" onClick={cancelEdit}>Cancel</button>
                    {
                        isCreate ? <></> : <button type="submit" onClick={deleteItem}
                                                   style={{backgroundColor: "#bb2124"}}>Delete</button>
                    }

                </div>
            </form>
        </div>
    )
}