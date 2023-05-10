import React, {FormEvent, useState} from 'react';
import styles from './Driver.module.css'
import {useNavigate} from "react-router-dom";
import {DriverInfo} from "../../types/types";
import axios from "axios";
import {NavigationBar} from "../dashboard/NavigationBar";
import {useAppSelector} from "../../hooks";
import {selectUserId} from "../user/userSlice";
import {
    selectIsCreate,
    selectId,
    selectFirstName,
    selectLastName,
    selectAddress,
    selectDateOfBirth,
    selectStartingDate,
    selectEndingDate,
    selectPhoneNumber
} from "./driverSlice";

export function DriverForm() {
    const isCreate = useAppSelector(selectIsCreate);
    const id = useAppSelector(selectId);
    const firstName = useAppSelector(selectFirstName);
    const lastName = useAppSelector(selectLastName);
    const address = useAppSelector(selectAddress);
    const DOB = useAppSelector(selectDateOfBirth);
    const startingDate = useAppSelector(selectStartingDate);
    const endingDate = useAppSelector(selectEndingDate);
    const phoneNumber = useAppSelector(selectPhoneNumber);

    const user_id = useAppSelector(selectUserId);
    let initState: DriverInfo = {
        "owner": user_id,
        "first_name": firstName,
        "last_name": lastName,
        "date_of_birth": DOB,
        "address": address,
        "phone_number": phoneNumber,
        "starting_date": startingDate,
        "ending_date": endingDate,
    }
    const [driverData, setDriverData] = useState(initState);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (driverData.owner) {
            if (isCreate) {
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
            } else {
                axios.put(`http://localhost:8000/drivers/${id}/`, JSON.stringify(driverData), {
                    headers: {
                        'Content-Type': 'application/json',
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
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement
        setDriverData({
            ...driverData,
            [target.name]: target.value
        })
    }
    const deleteItem = (event: FormEvent) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/drivers/${id}`, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${token}`
            }, withCredentials: true
        })
            .then((res) => {
                navigate("/driver-list")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const cancelEdit = (event: FormEvent) => {
        event.preventDefault();
        navigate("/driver-list")
    }
    return (
        <div>
            <NavigationBar/>
            <form className={styles.driver_form}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="firstName" name="first_name" defaultValue={firstName}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="lastName" name="last_name" defaultValue={lastName}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input onChange={handleChange} type="date" className="form-control" id="dob" name="date_of_birth" defaultValue={DOB}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input onChange={handleChange} type="text" className="form-control" id="address" name="address" defaultValue={address}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input onChange={handleChange} type="tel" className="form-control" id="phoneNumber"
                           name="phone_number" defaultValue={phoneNumber} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="startingDate">Starting Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="startingDate"
                           name="starting_date" defaultValue={startingDate} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="endingDate">Ending Date</label>
                    <input onChange={handleChange} type="date" className="form-control" id="endingDate"
                           name="ending_date" defaultValue={endingDate} />
                </div>
                <div className="mb-3">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button type="submit" onClick={cancelEdit}>Cancel</button>
                    {!isCreate ?
                        <button type="submit" onClick={deleteItem} style={{backgroundColor: "#bb2124"}}>Delete</button>: <></>
                    }
                </div>
            </form>

        </div>
    )
}