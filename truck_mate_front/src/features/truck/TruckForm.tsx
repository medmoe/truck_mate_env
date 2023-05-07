import React, {FormEvent, useState} from 'react';
import styles from './Truck.module.css';
import {TruckInfo} from "../../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectUserId} from "../user/userSlice";
import {
    selectIsCreate,
    selectBrand,
    selectCapacity,
    selectMileage,
    selectModel,
    selectStartingDate,
    selectYear,
    selectId
} from "./truckSlice";

export function TruckForm() {
    /* truck info */
    const isCreate = useAppSelector(selectIsCreate);
    const brand = useAppSelector(selectBrand);
    const model = useAppSelector(selectModel);
    const startingDate = useAppSelector(selectStartingDate);
    const year = useAppSelector(selectYear);
    const mileage = useAppSelector(selectMileage);
    const capacity = useAppSelector(selectCapacity);
    const id = useAppSelector(selectId);

    const user_id = useAppSelector(selectUserId);
    let initState: TruckInfo = {
        "owner": user_id,
        "brand": brand,
        "model": model,
        "starting_date": startingDate,
        "year": year,
        "mileage": mileage,
        "capacity": capacity,
    }
    const [truckData, setTruckData] = useState(initState)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(truckData.owner)
        if (truckData.owner) {
            if (isCreate) {
                axios.post("http://localhost:8000/trucks/", JSON.stringify(truckData), {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    }, withCredentials: true
                })
                    .then((res) => {
                        navigate("/truck-list")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                axios.put(`http://localhost:8000/trucks/${id}/`, JSON.stringify(truckData), {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    }, withCredentials: true
                })
                    .then((res) => {
                        navigate("/truck-list");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
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
            <NavigationBar/>
            <form className={styles.truck_form}>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input onChange={handleChange} type="text" className="form-control" id="model" name="model"
                           defaultValue={model}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input onChange={handleChange} type="text" className="form-control" id="brand" name="brand"
                           defaultValue={brand}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="starting_date" className="form-label">Starting Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="starting_date"
                           name="starting_date" defaultValue={startingDate} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input onChange={handleChange} type="number" className="form-control" id="year" name="year"
                           defaultValue={year}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="mileage" className="form-label">Mileage</label>
                    <input onChange={handleChange} type="number" className="form-control" id="mileage" name="mileage"
                           defaultValue={mileage}
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input onChange={handleChange} type="number" className="form-control" id="capacity" name="capacity"
                           defaultValue={capacity}
                           required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}