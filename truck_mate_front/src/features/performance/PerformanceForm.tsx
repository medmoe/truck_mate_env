import React, {FormEvent, useState} from "react";
import styles from './Performance.module.css';
import {PerformanceInfo, API} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectDrivers, selectTrucks, selectUserId} from "../user/userSlice";
import {
    selectIsCreate,
    selectDate,
    selectDriver,
    selectEndingQuantity,
    selectEndingTime,
    selectId,
    selectStartingQuantity,
    selectStartingTime,
    selectTruck,
    selectStartingMileage,
    selectEndingMileage
} from "./performanceSlice";

export function PerformanceForm() {
    /* performance state info */
    const id = useAppSelector(selectId);
    const isCreate = useAppSelector(selectIsCreate);
    const driver = useAppSelector(selectDriver);
    const truck = useAppSelector(selectTruck);
    const date = useAppSelector(selectDate);
    const startingQty = useAppSelector(selectStartingQuantity);
    const endingQty = useAppSelector(selectEndingQuantity);
    const startingTime = useAppSelector(selectStartingTime);
    const endingTime = useAppSelector(selectEndingTime);
    const startingMileage = useAppSelector(selectStartingMileage);
    const endingMileage = useAppSelector(selectEndingMileage);

    const user_id = useAppSelector(selectUserId);
    const drivers = useAppSelector(selectDrivers);
    const trucks = useAppSelector(selectTrucks);
    let initState: PerformanceInfo = {
        "owner": user_id,
        "driver": driver,
        "truck": truck,
        "date": date,
        "starting_quantity": startingQty,
        "ending_quantity": endingQty,
        "starting_time": startingTime,
        "ending_time": endingTime,
        "starting_mileage": startingMileage,
        "ending_mileage": endingMileage,
    }
    const [performanceData, setPerformanceData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const numberProperties = ['starting_quantity', 'ending_quantity', 'starting_mileage', 'ending_mileage'];
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isCreate) {
            axios.post(`${API}performance/`, JSON.stringify(performanceData), {
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
        } else {
            axios.put(`${API}performance/${id}/`, JSON.stringify(performanceData), {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${token}`,
                }, withCredentials: true
            })
                .then((res) => {
                    navigate("/performance-list")
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const {name, value} = event.target as HTMLInputElement
        let newValue = value

        if (name === "driver" || name === "truck") {
            newValue = JSON.parse(value);
        }

        setPerformanceData({
            ...performanceData,
            [name]: numberProperties.includes(name) ? +newValue : newValue,
        })
    }
    const deleteItem = (event: FormEvent) => {
        event.preventDefault();
        axios.delete(`${API}performance/${id}/`, {
            headers: {
                'Content-Type': "application/json",
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
    const cancelEdit = (event: FormEvent) => {
        event.preventDefault();
        navigate("/performance-list");
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
                        {/* Loop over the trucks array and create an option for each truck */}
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
                    <label htmlFor="starting_mileage" className="form-label">Starting mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="starting_mileage"
                           name="starting_mileage" defaultValue={startingMileage} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_mileage" className="form-label">Ending mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="ending_mileage"
                           name="ending_mileage" defaultValue={endingMileage} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_quantity" className="form-label">Starting Quantity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="starting_quantity"
                           name="starting_quantity" defaultValue={startingQty} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_quantity" className="form-label">Ending Quantity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="ending_quantity"
                           name="ending_quantity" defaultValue={endingQty} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_time" className="form-label">Starting Time</label>
                    <input onChange={handleChange} type="time" className="form-control" id="starting_time"
                           name="starting_time" defaultValue={startingTime}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ending_time" className="form-label">Ending Time</label>
                    <input onChange={handleChange} type="time" className="form-control" id="ending_time"
                           name="ending_time" defaultValue={endingTime}
                           required/>
                </div>
                <div className="mb-3">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
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
